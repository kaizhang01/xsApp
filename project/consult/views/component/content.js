function aSmallBanner(data) {
    let { img, text } = data;
    return aDiv({
        styles: ["SmallBanner"],
        childs: [
            aImg({ styles: ["SmallBannerImg"], img: img }),
            aText({ styles: ["SmallBannerText"], txt: text })
        ]
    });
}
function aSideMenu(data) {
    let { menu } = data;
    // if (checkParamCorrect(data))
    //     return null;
    return aDiv({
        styles: ["SideMenuBox"],
        childs: [
            aSmallBanner({
                img: "",
                text: menu.name
            }),
            aVerticalMenu({ menu: menu.subMenu })
        ]
    });

}

function aVerticalMenu(data) {
    let { menu } = data;
    if (menu == undefined)
        return null;
    return aDiv({
        styles: ["VerticalMenu"], childs:
            (function () {
                let group = [];
                for (let i = 0; i < menu.length; i++) {
                    const menuItem = menu[i];
                    let verticalMenuItem = aVerticalMenuItem(menuItem);
                    group.push(verticalMenuItem);
                    let subMenu = aSubMenu(menuItem.subMenu);
                    if (subMenu != null) {
                        subMenu.animation = {};
                        group.push(subMenu);
                        verticalMenuItem.subMenu = subMenu;
                    }


                }
                return group;
            })(),

    });
    function aVerticalMenuItem(menuItem) {
        return aDiv({
            styles: ["VerticalMenuItem"],
            childs: [
                aText({ styles: ["VerticalMenuItemText"], txt: menuItem.name }),
                aDiv({
                    styles: ["VerticalMenuItemResArea"],
                    onMouseover: function (evt) {
                        let verticalMenuItem = evt.currentTarget.parentNode;
                        setStyles(verticalMenuItem, ["VerticalMenuItemMouseover"]);
                    },
                    onMouseout: function (evt) {
                        let verticalMenuItem = evt.currentTarget.parentNode;
                        setStyles(verticalMenuItem, ["VerticalMenuItem"]);
                    },
                    onClick: function (evt) {
                        let verticalMenuItem = evt.currentTarget.parentNode;
                        let subMenu = verticalMenuItem.subMenu;
                        if (subMenu == null)
                            return;
                        if (subMenu.open == undefined) {
                            subMenu.open = true;
                            animate(subMenu, {
                                type: "VerticalRollOut",
                                demensionObj: subMenu.childNodes[0],
                                duration: 200
                            });
                        }
                        else {
                            subMenu.open = undefined;
                            animate(subMenu, {
                                type: "VerticalRollIn",
                                duration: 200
                            });
                        }


                    }
                }),

            ]
        });
    }
    function aSubMenu(subMenu) {
        if (subMenu == undefined)
            return null;
        return aDiv({
            styles: ["SubMenuConnector"], childs: [
                aDiv({
                    styles: ["SubMenu"], childs: (function () {
                        let group = [];
                        for (let i = 0; i < subMenu.length; i++) {
                            const menuItem = subMenu[i];
                            group.push(aSubMenuItem(menuItem));
                        }
                        return group;
                    })()
                })
            ]
        });
        function aSubMenuItem(menuItem) {
            return aDiv({
                styles: ["SubMenuItem"],
                childs: [
                    aText({ styles: ["SubMenuItemText"], txt: menuItem.name }),
                    aDiv({ styles: ["SubMenuItemResArea"] }),

                ],
                onMouseover: function (evt) {
                    let subMenuItem = evt.currentTarget;
                    let subMenuItemText = subMenuItem.childNodes[0];
                    setStyles(subMenuItem, ["SubMenuItemMouseOver"]);
                    setStyles(subMenuItemText, ["SubMenuItemTextMouseOver"]);
                },
                onMouseout: function (evt) {
                    let subMenuItem = evt.currentTarget;
                    let subMenuItemText = subMenuItem.childNodes[0];
                    setStyles(subMenuItem, ["SubMenuItem"]);
                    setStyles(subMenuItemText, ["SubMenuItemText"]);
                },
                onClick: function (evt) {
                    let subMenuItem = evt.currentTarget;
                    refreshDetailBox(menuItem.url, detailBox);
                }
            });
        }
    }
}
function refreshDetailBox(url) {
    let detailBox = document.getElementById("detailBox");
}
function aDetailBox(menuPath) {
    let currentMenu = menuPath[menuPath.length - 1];
    let detailBox = aDiv({
        styles: ["DetailBox"], childs: [
            aDiv({
                styles: ["DetailBoxHead"], childs: [
                    aText({ styles: ["DetailBoxHeadText"], txt: currentMenu.name, type: "h2" }),
                    aDiv({
                        styles: ["DetailBoxHeadLinksBox"], childs:
                            (function () {
                                let linkGroup = [];
                                if (menuPath.length == 1) {
                                    linkGroup.push(aText({ styles: ["DetailBoxHeadLinksText"], txt: "more" }));
                                    linkGroup.push(aText({ styles: ["DetailBoxHeadLinksConnector"], txt: ">", translate: "no" }));
                                } else {
                                    for (let i = 0; i < menuPath.length; i++) {
                                        const menu = menuPath[i];
                                        linkGroup.push(aLinkText(menu));
                                        if (i != menuPath.length - 1)
                                            linkGroup.push(aText({ styles: ["DetailBoxHeadLinksConnector"], txt: ">", translate: "no" }));
                                    }
                                }

                                return linkGroup;
                                function aLinkText(menu) {
                                    return aText({
                                        styles: ["DetailBoxHeadLinksText"], txt: menu.name,
                                        onMouseover: function () {

                                        },
                                        onMouseout: function () {

                                        },
                                        onClick: function () {

                                        }
                                    });
                                }
                            })()
                    })
                ]
            }),
            aDiv({
                id: currentMenu.name + "-detailContent",
                styles: ["DetailBoxContent"],
            }),
        ]
    });
    let currentUrl = currentMenu.url;
    let currentMenuName = currentUrl.slice(currentUrl.indexOf("/detail/") + 8);
    addComponents([`/project/consult/views/detail/${currentMenuName}.js`], function () {
        let detailContent = document.getElementById(currentMenuName + "-detailContent");
        addChild(detailContent, addDetail());

    });
    return detailBox;
}
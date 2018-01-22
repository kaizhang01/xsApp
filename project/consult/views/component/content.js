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
    let { menu, styles } = data;
    // if (checkParamCorrect(data))
    //     return null;
    return aDiv({
        styles: ["SideMenuBox"],
        childs: [
            aSmallBanner({
                img: "",
                text: menu.item.name
            }),
            aVerticalMenu({ menu: menu.dropDown })
        ]
    });

}

function aVerticalMenu(data) {
    let { menu } = data;
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
                        if(subMenu==null)
                        return;
                        if (subMenu.open == undefined)
                        {
                            subMenu.open = true;
                            animate(subMenu, {
                                type: "VerticalRollOut",
                                demensionObj: subMenu.childNodes[0],
                                duration: 200
                            });
                        }
                        else{
                            subMenu.open=undefined;
                            animate(subMenu,{
                                type:"VerticalRollIn",
                                duration:200
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
                            group.push(aDiv({
                                styles: ["SubMenuItem"],
                                childs: [
                                    aText({ styles: ["SubMenuItemText"], txt: menuItem.name }),
                                    aDiv({ styles: ["SubMenuItemResArea"] }),

                                ]
                            }));
                        }
                        return group;
                    })()
                })
            ]
        });

    }
}

function aDetailBox(data) {
    let { head, content } = data;
    return aDiv({
        styles: ["DetailBox"], childs: [
            aDiv({
                styles: ["DetailBoxHead"], childs: [
                    aText({ styles: ["DetailBoxHeadText"], txt: head.name, type: "h2" }),
                    aLink({ styles: ["DetailBoxHeadLinkMore"], txt: "more >", href: head.url })
                ]
            }),
            aDiv({ styles: ["DetailBoxContent"], childs: content }),
        ]
    });
}
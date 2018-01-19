
function aStretchableNavBar(data) {
    let { stripData, navBarData } = data;
    let div = aDiv({
        styles: ["StretchableNavBar"], childs: [
            aStrip(stripData),
            aNavBar(navBarData),
        ]
    });
    window.oldScrollY = 0;
    window.addEventListener("scroll", function () {
        // 		console.log(window.scrollY);
        // div.style.top=-35+"px";
        let scrollDist = window.scrollY - window.oldScrollY;
        if (scrollDist > 0) {
            moveStrip({ from: 0, to: -35, duration: 200, beginStatus: ["show"], endStatus: "hide" });

        } else if (scrollDist < 0) {
            moveStrip({ from: -35, to: 0, duration: 200, beginStatus: ["hide"], endStatus: "show" });
        }
        window.oldScrollY = window.scrollY;
    });
    div.animation = {};
    div.animation.status = "show";
    function moveStrip(data) {
        let { from, to, duration, beginStatus, endStatus } = data;
        if (!matchStatus(beginStatus))
            return;
        div.animation.ID = requestAnimationFrame(function (timeStamp) {
            div.animation.startTime = timeStamp;
            div.animation.posY_from = from;
            div.animation.posY_to = to;
            div.animation.dist = div.animation.posY_to - div.animation.posY_from;
            update(timeStamp);
        });
        function update(timeStamp) {
            div.animation.status = "moving";
            let runTime = timeStamp - div.animation.startTime;
            let progress = runTime / duration;
            progress = Math.min(progress, 1);
            div.style.top = (div.animation.posY_from + div.animation.dist * progress) + "px";
            if (runTime < duration) {
                div.animation.ID = requestAnimationFrame(update);
            } else {
                div.animation.status = endStatus;
            }
        }
        function matchStatus(beginStatus) {
            for (let i = 0; i < beginStatus.length; i++) {
                const status = beginStatus[i];
                if (div.animation.status === status)
                    return true;
            }
            return false;
        }
    }
    return div;
}

function aStrip(data) {
    let { text } = data;
    let StripHeadBox = aDiv({
        styles: ["StripHeadBox"], childs: [
            aText({ styles: ["StripHeadText"], txt: text }),
        ]
    });

    let ImgSrc;
    let languageText;
    if (UIlanguage === "CHN") {
        ImgSrc = "/project/consult/img/language-USA.jpg";
        languageText = "United States";
    }
    else if (UIlanguage === "USA") {
        ImgSrc = "/project/consult/img/language-CHN.jpg";
        languageText = "China";
    }
    let LanguageBox = aDiv({
        styles: ["LanguageBox"], childs: [
            aImg({ styles: ["LanguageImg"], src: ImgSrc }),
            aText({ styles: ["LanguageText"], txt: languageText })
        ],
        onMouseover: languageBoxMouseOver,
        onMouseout: languageBoxMouseOut,
        onClick: languageBoxOnClick

    });
    function languageBoxMouseOver() {
        setStyles(LanguageBox, ["LanguageBoxMouseOver"]);
    }
    function languageBoxMouseOut() {
        setStyles(LanguageBox, ["LanguageBox"]);
    }
    function languageBoxOnClick() {
        if (UIlanguage === "CHN") {
            changeLanguage("USA");
        }
        else if (UIlanguage === "USA") {
            changeLanguage("CHN");
        }
    }
    return aDiv({
        styles: ["Strip"], childs: [
            StripHeadBox,
            LanguageBox
        ]
    });

}
function aNavBar(data) {
    let { logo, menu } = data;
    return aDiv({
        styles: ["NavBar"], childs: [
            aDiv({
                styles: ["logo"], childs: [
                    aImg({
                        styles: ["logoImage"], src: logo,
                        onClick: function (evt) {
                            directToUrl("/todo");
                        }
                    }),
                ]
            }),

            aDiv({ styles: ["MenuBox"], childs: buildNavMenuHorizon(menu) })
        ]
    });
}

function buildNavMenuHorizon(menu) {

    let NavMenu = [];
    for (let i = 0; i < menu.length; i++) {
        // NavMenu.push(aText({ styles: ["NavMenuTxt"],txt: itemName, type: "h2"}));
        NavMenu.push(aMenuItem(menu[i]));
    }
    return NavMenu;
}

function aMenuItem(data) {
    let { item, dropDown } = data;

    let MenuItemBox = aDiv({
        styles: ["NavMenuItemBox"], childs: [
            aText({ txt: item.name, t: item.t, type: "h2", styles: ["NavMenuTxt"] }),
            aDiv({
                styles: ["NavMenuItemResArea"],
                onClick: function (evt) {
                    checkAction(item);
                },
                onMouseover: function (evt) {
                    // set style
                    setStyles(MenuItemBox, ["NavMenuItemBoxMouseover"]);

                    //shwo and animate menu
                    
                    if (dropDownMenu!=undefined&&dropDownMenu.show == false) {
                        show(dropDownMenu);
                        animate(dropDownMenu, {
                            type: "VerticalRollOut",
                            duration: 200,
                        });
                    }



                },
                onMouseout: function (evt) {

                    if (!mouseIsInRect(evt, dropDownMenu)) {
                        setStyles(MenuItemBox, ["NavMenuItemBox"]);
                        hide(dropDownMenu);
                    }
                },

            }),
        ]
    });
    // MenuItemBox.pulldownShow = false;
    let dropDownMenu = aDropDownList({ dropDown: dropDown });
    if (dropDownMenu != undefined) {
        dropDownMenu.show = false;
        dropDownMenu.animation = {};
    }

    return aDiv({
        styles: ["PullDownMenuBox"],
        childs: [
            MenuItemBox,
            dropDownMenu
        ],

    });

    function aDropDownList(data) {
        let { dropDown } = data;
        if (dropDown == undefined)
            return undefined;
        let dropDownBox = aDiv({
            styles: ["DropDownBox"],
            childs: buildDropDownList(),

        });
        let dropDownMenu = aDiv({
            styles: ["DropDownBoxConnector"], childs: [
                dropDownBox

            ],
            onMouseout: function (evt) {
                let isInDropDownBox = mouseIsInRect(evt, dropDownBox);
                let isInMenuItem = mouseIsInRect(evt, MenuItemBox);
                if (!isInDropDownBox && !isInMenuItem) {
                    setStyles(MenuItemBox, ["NavMenuItemBox"]);
                    hide(dropDownMenu);

                }

            }

        });
        return dropDownMenu;

        function buildDropDownList() {
            let element = [];

            for (let i = 0; i < dropDown.length; i++) {
                addItem(dropDown[i]);
            }
            function addItem(item) {
                let dropDownItemSelector = aDiv({ styles: ["DropDownItemSelector"] });
                let dropDownItemText = aText({ styles: ["DropDownMenuText"], txt: item.name, t: item.t, type: "h2" });
                let dropDownItemResArea = aDiv({
                    save: { item: item },
                    styles: ["dropDownItemBoxResArea"],
                    onMouseover: function (evt) {
                        setStyles(dropDownItemSelector, ["DropDownItemSelectorMouseover"]);
                    },
                    onMouseout: function (evt) {
                        let isInDropDownBox = mouseIsInRect(evt, dropDownBox);
                        let isInMenuItem = mouseIsInRect(evt, MenuItemBox);
                        if (!isInDropDownBox && !isInMenuItem) {
                            setStyles(MenuItemBox, ["NavMenuItemBox"]);
                            hide(dropDownMenu);

                        }

                        setStyles(dropDownItemSelector, ["DropDownItemSelector"]);


                    },
                    onClick: function (evt) {
                        checkAction(item);
                    },
                });
                element.push(
                    aDiv({
                        styles: ["DropDownItemBox"],
                        childs: [
                            dropDownItemSelector,
                            dropDownItemText,
                            dropDownItemResArea
                        ],

                    })
                );
            }
            return element;
        }
    }

}




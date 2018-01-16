
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
            moveStrip({ from: -35, to: 0, duration: 200, beginStatus: ["hide"], endStatus: "show" })
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
            aText({ txt: item, type: "h2", styles: ["NavMenuTxt"] }),
            aDiv({
                styles: ["NavMenuItemResArea"],
                onMouseover: MenuItemMouseOver,
                onMouseout: MenuItemMouseOut
            }),
        ]
    });
    MenuItemBox.pulldownShow = false;
    let dropDownMenu = aDropDownList({ dropDown: dropDown });
    if (dropDownMenu != undefined)
        dropDownMenu.animation = {};
    return aDiv({
        styles: ["PullDownMenuBox"],
        childs: [

            MenuItemBox,
            dropDownMenu
        ],

    });

    function MenuItemMouseOver(evt) {
        let MenuItemBox = evt.currentTarget.parentNode;
        let dropDownMenu = MenuItemBox.parentNode.childNodes[1];
        if (dropDownMenu != undefined) {
            if (MenuItemBox.pulldownShow == false) {
                show(dropDownMenu);
                let dropDownMenuBox = dropDownMenu.childNodes[0];
                let rect = dropDownMenuBox.getBoundingClientRect();
                let height = rect.height + 5;
                animate(dropDownMenu, {
                    property: "height",
                    unit: "px",
                    from: 0,
                    to: height,
                    duration: 200,
                });
                MenuItemBox.pulldownShow = true;
            }

        }
        setStyles(MenuItemBox, ["NavMenuItemBoxMouseover"]);

       
    }
    function MenuItemMouseOut(evt) {
        let MenuItemBox = evt.currentTarget.parentNode;
        let dropDownMenu = MenuItemBox.parentNode.childNodes[1];

        if (dropDownMenu != undefined) {
            let dropDownMenuResArea = dropDownMenu.childNodes[0].childNodes[0];
            let dropRect = dropDownMenuResArea.getBoundingClientRect();
            if (mouseIsInRect(evt.clientX, evt.clientY,
                {
                    top: dropRect.top - 1.5,
                    bottom: dropRect.bottom,
                    left: dropRect.left,
                    right: dropRect.right
                })) {
                return;
            }
            // dropDownMenu.animate("pullUp", function () {
            hide(dropDownMenu);
            MenuItemBox.pulldownShow = false;
            // });
        }
        setStyles(MenuItemBox, ["NavMenuItemBox"]);
    
    }


}


function aDropDownList(data) {
    let { dropDown } = data;
    if (dropDown == undefined)
        return undefined;
    return aDiv({
        styles: ["DropDownBoxConnector"], childs: [
            aDiv({ styles: ["DropDownBox"], childs: buildDropDownList() }),

        ]


    });


    function buildDropDownList() {
        let element = [];
        element.push(aDiv({
            styles: ["dropDownBoxResArea"],
            // onMouseover: dropDownItemMouseOver,
            onMouseout: dropDownBoxMouseOut
        }));
        function dropDownBoxMouseOut(evt) {
            // 			console.log("dropDownBox")
            let dropDownMenu = evt.currentTarget.parentNode.parentNode;
            let MenuItemBox = dropDownMenu.parentNode.childNodes[0];
            let rect = evt.currentTarget.getBoundingClientRect();

            if (mouseIsInRect(evt.clientX, evt.clientY, rect)) {

                return;
            }

            let menuItemResArea = evt.currentTarget.parentNode.parentNode.parentNode.childNodes[0].childNodes[1];
            rect = menuItemResArea.getBoundingClientRect();
            if (mouseIsInRect(evt.clientX, evt.clientY, rect)) {
                return;
            }
            // 			console.log("out- dropdownbox ");
            hide(dropDownMenu);
            MenuItemBox.pulldownShow = false;
            setStyles(MenuItemBox, ["NavMenuItemBox"]);
           
        }
        for (let i = 0; i < dropDown.length; i++) {
            const text = dropDown[i];
            element.push(
                aDiv({
                    styles: ["DropDownItemBox"],
                    childs: [
                        aDiv({ styles: ["DropDownItemSelector"] }),
                        aText({ styles: ["DropDownMenuText"], txt: text, type: "h2" }),
                        aDiv({
                            styles: ["dropDownItemBoxResArea"],
                            onMouseover: dropDownItemMouseOver,
                            onMouseout: dropDownItemMouseOut
                        })
                    ],

                }));

        }
        return element;

        function dropDownItemMouseOver(evt) {
            let selectsignal = evt.currentTarget.parentNode.childNodes[0];
            setStyles(selectsignal, ["DropDownItemSelectorMouseover"]);
            
        }
        function dropDownItemMouseOut(evt) {
            // 			console.log("dropDownItem");
            let selectsignal = evt.currentTarget.parentNode.childNodes[0];
            setStyles(selectsignal, ["DropDownItemSelector"]);

            let dropDownMenu = evt.currentTarget.parentNode.parentNode.parentNode;
            let dropDownMenuResArea = evt.currentTarget.parentNode.parentNode.childNodes[0];
            let rect = dropDownMenuResArea.getBoundingClientRect();

            if (mouseIsInRect(evt.clientX, evt.clientY, rect)) {
                return;
            }
            let menuItemResArea = evt.currentTarget.parentNode.parentNode.parentNode.parentNode.childNodes[0].childNodes[1];
            rect = menuItemResArea.getBoundingClientRect();
            if (mouseIsInRect(evt.clientX, evt.clientY, rect)) {
                return;
            }
            // 			console.log("out dropdownitem ");
            hide(dropDownMenu);
            let MenuItemBox = evt.currentTarget.parentNode.parentNode.parentNode.parentNode.childNodes[0];
            MenuItemBox.pulldownShow = false;
            setStyles(MenuItemBox, ["NavMenuItemBox"]);
         
        }
    }
}

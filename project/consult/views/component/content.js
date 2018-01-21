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
            // aVerticalMenu({ menu: menu.dropDown })
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
                    const menuItemText = menu[i];
                    group.push(aDiv({
                        styles:["VerticalMenuItem"],
                        childs:[
                            aText({styles:["VerticalMenuItemText"],txt:menuItemText})
                        ]
                    }))
                }
            })(),

    });
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
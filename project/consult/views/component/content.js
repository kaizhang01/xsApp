function aSmallBanner(data) {
    let { img, text } = data;
    return aDiv({
        styles:["SmallBanner"],
        childs:[
            aImg({styles:["SmallBannerImg"] ,img: img }),
            aText({ styles:["SmallBannerText"],txt: text })
        ]
    });
}
function aSideMenu(data) {
    let { head, styles } = data;
    // if (checkParamCorrect(data))
    //     return null;
    return aDiv({
        styles: ["SideMenuBox"],
        childs: [
            aSmallBanner({
                img: head.img,
                text: head.text
            })
        ]
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
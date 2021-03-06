
addComponents([
    '/project/consult/views/component/title.js',
    '/project/consult/views/component/content.js',
    '/project/consult/views/share.js',
], function () {
    addHead();
    aMain({
        styles: ["IntroduceMain"], childs: [
            aFixedBanner({ img: "", title: "Small Step , Big Idea", subtitle: "", styles: ["FixedBanner"] }),
            // buildContent(),
            addFoot()
        ]
    });

    function buildContent() {
        let data = findFirstLinkData(mainMenu[0]);
       
        let content = aDiv({
            styles: ["Content"],
            childs: [
                aSideMenu({ menu: mainMenu[0] }),
                aDetailBox(data)
            ]
        });
        return content;
    }
    function findFirstLinkData(menu) {
        let subMenu = menu;
        while (subMenu.subMenu != undefined) {
            subMenu = subMenu.subMenu[0];
        }
        return subMenu;
    }
});


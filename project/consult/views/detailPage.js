
addComponents([
    '/project/consult/views/component/title.js',
    '/project/consult/views/component/content.js',
    '/project/consult/views/share.js'
], function () {
    addHead();
    aMain({
        styles: ["DetailMain"], childs: [
            aFixedBanner({ img: "", title: "Small Step , Big Idea", subtitle: "", styles: ["FixedBanner"] }),
            buildContent(),
            addFoot()
        ]
    });

    function buildContent() {
        let search = serverData.currentMenu;
        let mainMenu = serverData.mainMenu;
        let menuPath = searchMenuTree(search, mainMenu);
         findDefaultPath(menuPath);
        let content = aDiv({
            styles: ["Content"],
            childs: [
                aSideMenu({ menu:menuPath[0] }),
                aDetailBox(menuPath)
            ]
        });
        
        return content;
    }
    
});


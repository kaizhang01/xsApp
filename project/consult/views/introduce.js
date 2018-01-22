
addComponents([
    '/project/consult/views/component/title.js',
    '/project/consult/views/component/content.js',
    '/project/consult/views/share.js',
], function () {
    addHead();
    aMain({
        styles: ["IntroduceMain"], childs: [
            aFixedBanner({ img: "", title: "Small Step , Big Idea", subtitle: "", styles: ["FixedBanner"] }),
            aDiv({
                styles: ["Content"],
                childs: [
                    aSideMenu({ menu: mainMenu[0] }),

                ]
            }),
            addFoot()
        ]
    });

  
});


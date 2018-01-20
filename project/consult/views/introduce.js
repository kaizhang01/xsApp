
addComponents([
    '/project/consult/views/component/title.js',
    '/project/consult/views/component/content.js',
    '/project/consult/views/share.js',
], function () {
    addHead();
    aMain({
        styles: ["introduceMain"], childs: [
            aFixedBanner({ img: "", title: "Small Step , Big Idea", subtitle: "", styles: ["FixedBanner"] }),
            aDiv({
                styles: ["Content"],
                childs: [
                    aSideMenu({
                        head: { img: "", text:"Introduce" }
                    }),
                ]
            }),
        ]
    });

    addFoot();
});


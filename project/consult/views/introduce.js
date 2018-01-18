
addComponents([
    'project/consult/views/component/title.js',
    'project/consult/views/share.js',
], function () {
    addHead();
    aMain({
        styles: ["introduceMain"], childs: [
            aFixedBanner({ img: "", title: "Small Step , Big Idea", subtitle: "", styles: ["fixedBanner"] })
        ]
    });
    addFoot();
});


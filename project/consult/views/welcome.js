addComponents(
    [
        'project/consult/views/component/title.js',
        'project/consult/views/component/content.js',
        'project/consult/views/share.js'
    ], function () {
        addHead();
        aMain({
            styles: ["WelcomeMain"], childs: [

                aBannerBox({
                    bannerArr: [
                        {
                            img: "/project/consult/img/bannerImg.jpg",
                            title: "banner1-title",
                            subtitle: "banner1-subtitle"
                        },
                        {
                            img: "/project/consult/img/bannerImg2.png",
                            title: "banner2-title",
                            subtitle: "banner2-subtitle"
                        },
                        {
                            img: "/project/consult/img/bannerImg3.jpg",
                            title: "banner3-title",
                            subtitle: "banner3-subtitle"
                        }
                    ]

                }),
                (function () {
                    let data = [
                        { name: "About", url: "/detail/About" },
                        { name: "Service", url: "/detail/Service" },
                        { name: "Client", url: "/detail/Client" },
                        { name: "Contact Us", url: "/detail/ContactUs" }
                    ];
                    let detailBoxs = [];
                    for (let i = 0; i < data.length; i++) {
                        const d = data[i];
                        detailBoxs.push(aDiv({
                            styles: ["WelcomeGuideBox"], childs: [
                                aDetailBox([d])
                            ]
                        }));
                    }
                    return detailBoxs;
                })(),
                addFoot()
            ]
        });

    });












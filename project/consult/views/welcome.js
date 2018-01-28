addComponents(
    [
        'project/consult/views/component/title.js',
        'project/consult/views/component/content.js',
        'project/consult/views/share.js'
    ], function (){
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
                aDetailBox( [{ name: "About", url: "/detail/About" }]),
                aDetailBox([{ name: "Service", url: "/detail/Service" }]),
                aDetailBox([{ name: "Client", url: "/detail/Client" }]),
                aDetailBox([{ name: "JoinUs", url: "/detail/JoinUs" }]),
                addFoot()
            ]
        });
      
    });












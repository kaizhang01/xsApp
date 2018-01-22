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
                            title: "Information Bussiness Services",
                            subtitle: "help build business architecture, information architecture,caber security, flow Chart diagram, help solve the problems in App Development"
                        },
                        {
                            img: "/project/consult/img/bannerImg2.png",
                            title: "Cost Less",
                            subtitle: "order now, gain 50% discount"
                        },
                        {
                            img: "/project/consult/img/bannerImg3.jpg",
                            title: "Join Us",
                            subtitle: "build better life together and achieve success earlier"
                        }
                    ]
    
                }),
                aDetailBox({ head: { name: "About", url: "" }, content: [] }),
                aDetailBox({ head: { name: "Service", url: "" }, content: [] }),
                aDetailBox({ head: { name: "Client", url: "" }, content: [] }),
                aDetailBox({ head: { name: "JoinUs", url: "" }, content: [] }),
                addFoot()
            ]
        });
      
    });












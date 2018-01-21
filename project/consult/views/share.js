const mainMenu= [
    {
        item: { name: "About"},//t:"content"
        dropDown: [
            { name: "Introduce", url: "/Introduce"},
            { name: "News", url: "/News" },
            { name: "Honor", url: "/Honor" },
            { name: "Team", url: "/Team" }
        ]
    },
    {
        item: { name: "Service" },
        dropDown: [
            { name: "Cyber Security", url: "/CyberSecurity" },
            { name: "Data Analyze", url: "/DataAnalyze" },
            { name: "Website Design", url: "/WebSiteDesign" }
        ]
    },
    {
        item: { name: "Client" },
        dropDown: [
            { name: "Microsoft", url: "/Microsoft" },
            { name: "Google", url: "/Google" },
            { name: "Amazon", url: "/Amazon" }
        ]
    },
    { item: { name: "JoinUs", url: "/JoinUs" } },

];
function addHead() {
    addComponents([
        '/project/consult/views/component/head.js',
    ], function () {
        aMain({
            styles: ["Head"], childs: [
                aStretchableNavBar({
                    stripData: { text: "Advisory hotline: 400-881-2881" },
                    navBarData: {
                        logo: "/project/consult/img/logo.png",
                        menu:mainMenu
                    }
                })
            ]
        });
    });
}

function addFoot() {
    addComponents([
        '/project/consult/views/component/head.js',
    ], function () {
        aMain({
             childs: [
                aFoot({ tradeMark: "All Rights Reserver © INFOBIZ" })
            ]
        });
    });


}
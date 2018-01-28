// const mainMenu = [
//     {
//         item: { name: "About" },//t:"content"
//         subMenu: [
//             {
//                 name: "Introduce", url: "/detail/Introduce",
//                 subMenu: [
//                     { name: "overview", url: "/detail/overview" },
//                     { name: "culture", url: "/detail/culture" },
//                     { name: "progress", url: "/detail/progress" }
//                 ]
//             },
//             {
//                 name: "News", url: "/detail/News",
//                 subMenu: [
//                     { name: "Company News", url: "/detail/companyNews" },
//                     { name: "Contract News", url: "/detail/ContractNews" }
//                 ]
//             },
//             { name: "Honor", url: "/detail/Honor" },
//             { name: "Team", url: "/detail/Team" }
//         ]
//     },
//     {
//         item: { name: "Service" },
//         subMenu: [
//             { name: "Cyber Security", url: "/detail/CyberSecurity" },
//             { name: "Data Analyze", url: "/detail/DataAnalyze" },
//             { name: "Website Design", url: "/detail/WebSiteDesign" }
//         ]
//     },
//     {
//         item: { name: "Client" },
//         subMenu: [
//             { name: "Microsoft", url: "/detail/Microsoft" },
//             { name: "Google", url: "/detail/Google" },
//             { name: "Amazon", url: "/detail/Amazon" }
//         ]
//     },
//     { item: { name: "JoinUs", url: "/detail/JoinUs" } },

// ];
function addHead() {
    addComponents([
        '/project/consult/views/component/head.js',
    ], function () {
        aMain({
            styles: ["Head"], childs: [
                aStretchableNavBar({
                    stripData: { text: "AdvisoryHotline" },
                    navBarData: {
                        logo: "/project/consult/img/logo.png",
                        menu: serverData.mainMenu
                    }
                })
            ]
        });
    });
}

function addFoot() {

    return aDiv({
        styles: ["Foot"],
        childs: [
            aText({
                txt: "All Rights Reserver © INFOBIZ",
                styles: ["TradeMark"]
            }),

        ]
    });



}

// function addaTest(){
//     addComponents([
//         '/project/consult/views/component/head.js', 
//     ],function(){
//         aMain({
//             styles:["Head"],childs:[
//                 aDiv({styles:["test"]})
//             ]
//         });
//     });
// }
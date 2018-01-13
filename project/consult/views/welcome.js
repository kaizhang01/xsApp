

buildLanguageMap({
	"About": undefined,
	"Service": undefined,
	"Client": undefined,
	"Contact": undefined
}, function () {
	addComponents(
		[
			'project/consult/views/component/head.js',
			'project/consult/views/component/title.js',
			'project/consult/views/component/foot.js'
		], main);
});

function main() {

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
			aDetailBox({ head: { title: UIText("About"), link: "" }, content: [] }),
			aDetailBox({ head: { title: UIText("Service"), link: "" }, content: [] }),
			aDetailBox({ head: { title: UIText("Client"), link: "" }, content: [] }),
			aDetailBox({ head: { title: UIText("Contact"), link: "" }, content: [] }),
			aFoot({ tradeMark: "All Rights Reserver © INFOBIZ" }),

			aStretchableNavBar({
				stripData: { text: "Advisory hotline: 400-881-2881" },
				navBarData: {
					logo: "/project/consult/img/logo.png",
					menu: [
						{ item: UIText("About") },
						{ item: UIText("Service"), dropDown: ["cyber security", "data Analyze", "website design"] },
						{ item: UIText("Client"), dropDown: ["Microsoft", "Google", "Amazon"] },
						{ item: UIText("Contact") },

					]
				}
			}),


		]
	});


}
//head:{title:"Service" ,link:""}
function aDetailBox(data) {
	let { head, content } = data;
	return aDiv({
		styles: ["DetailBox"], childs: [
			aDiv({
				styles: ["DetailBoxHead"], childs: [
					aText({ styles: ["DetailBoxHeadText"], txt: head.title }),
					aLink({ styles: ["DetailBoxHeadLinkMore"], txt: "more >", href: head.link })
				]
			}),
			aDiv({ styles: ["DetailBoxContent"], childs: content }),
		]
	});
}








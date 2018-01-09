
addComponents(
	[
		'project/consult/views/component/head.js',
		'project/consult/views/component/title.js'
	], main);
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
			aDetailBox({ head: { title: "About", link: "" }, content: [] }),
			aDetailBox({ head: { title: "Service", link: "" }, content: [] }),
			aDetailBox({ head: { title: "Client", link: "" }, content: [] }),
			aDetailBox({ head: { title: "Contact", link: "" }, content: [] }),


			aNavBar({
				logo: "/project/consult/img/logo.png",
				menu: [
					{ item: "About" },
					{ item: "Service", dropDown: ["cyber security", "data Analyze", "website design"] },
					{ item: "Client", dropDown: ["Microsoft", "Google", "Amazon"] },
					{ item: "Contact" },

				]
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



function aboutDetail() {
	return aDiv({ styles: ["DetailBox"] })

}
function serviceDetail() {


}
function clientDetail() {


}
function contactDetail() {


}






addComponents(
	[
		'project/consult/views/component/head.js',
		'project/consult/views/component/title.js'
	], main);
function main() {
	aMain({
		styles: ["Main"], childs: [
			aNavBar({
				txt: "solutions",
				menu: ['Service', 'Products', 'Stories', 'About']
			}),

			aBannerBox({
				bannerArr: [
					{
						img: "/project/consult/img/bannerImg.jpg",
						title: "Information Bussiness Services",
						subtitle: "help build business architecture, information architecture,caber security, flow Chart diagram, help solve the problems in App Development"
					},
					{
						img: "/project/consult/img/bannerImg2.png",
						title:"Cost Less",
						subtitle:"order now, gain 50% discount"
					},
					{
						img:"/project/consult/img/bannerImg3.jpg",
						title:"Join Us",
						subtitle:"build better life together and achieve success earlier"
					}
				]

			})



		]
	});
}





function buildTitle() {
	return [

	];

}






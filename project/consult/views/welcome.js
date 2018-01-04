
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
				menu: ['Service', 'Products','Stories','About']
			}),
			
			aTitle({ childs: buildTitle() }),
			
		]
	});
}





function buildTitle() {
	return [
		aText({ txt: "Information Bussiness Services", type: "h1", styles: ["Title-mainTxt"] }),
		aText({
			txt: "help build business architecture, information architecture,caber security, flow Chart diagram, help solve the problems in App Development",
			styles: ["Title-subTxt"]
		}),
	];

}






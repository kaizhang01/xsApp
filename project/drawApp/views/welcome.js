
addComponents(
	[
		'/project/drawApp/views/component/head.js',
		'/project/drawApp/views/component/title.js'
	], main);
function main() {
	aMain({
		styles: ["Main"], childs: [
			aNavBar({
				txt: "Relaxslow",
				menu: ['Service', 'Products','Stories','About']
			}),
			aDiv({ styles: ["PageSide"] }),
			aTitle({ childs: buildTitle() }),
			aDiv({ styles: ["PageSide"] })
		]
	});
}





function buildTitle() {
	return [
		aText({ txt: "Welcome To Draw App", type: "h1", styles: ["Title-mainTxt"] }),
		aText({ txt: "this is a simple draw app", styles: ["Title-subTxt"] }),
		aLink({ txt: "Go To Gallery", href: "/gallery", styles: ["LinkButton"] })
	];

}






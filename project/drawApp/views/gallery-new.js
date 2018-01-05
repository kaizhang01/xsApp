

addComponents(
	[
		'/project/drawApp/views/component/head.js',
		'/project/drawApp/views/component/title.js'

	], main);

function main() {
	aMain({
		styles: ["Main"],
		childs:
			[
				aNavBar({
					txt: "Relaxslow",
					menu: ["aaa", 'bbb', 'ccc']
				}),
				aDiv({ styles: ["PageSide"] }),
				aTitle({ childs: buildPageCenter() }),
				aDiv({ styles: ["PageSide"] }),


			]
	});
}



function buildPageCenter() {
	return [
		aText({ txt: "create New Pic", type: "h1", styles: ["Title-mainTxt"] }),
		aText({ txt: "/client/img/bath.jpg", type: "p" }),
		aInput({ type: "text", placeholder: "name", id: "nameInput" }),
		aInput({ type: "text", placeholder: "img url", id: "urlInput" }),
		aButton({
			name: "submit",
			styles:["LinkButton"],
			onclick:
				function () {
					sendRequest({
						url: "/gallery",
						method: "POST",
						jsonObj:
							JSON.stringify({
								name: getValue("nameInput"),
								img: getValue("urlInput")
							}),
						type:"checked--operate",
					});
				}
		})
	];


}

function aNavBar(data) {
	let { txt, menu } = data;
	return aDiv({
		styles: ["NavBar"], childs: [
			aText({ txt: txt, type: "h1", styles: ["NavHeadTxt"] }),
			aDiv({ styles: ["Menu"], childs: buildNavMenuHorizon({ menuItemName: menu }) })
		]
	});
}


function buildNavMenuHorizon(data) {
	
	let { menuItemName } = data;
	let NavMenu = [];
	for (let i = 0; i < menuItemName.length; i++) {
		const itemName = menuItemName[i];
		NavMenu.push(aText({ txt: itemName, type: "h2", styles: ["NavMenuTxt"] }))
	}
	return NavMenu;
}
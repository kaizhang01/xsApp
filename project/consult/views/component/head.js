
// menudata
// let menu=[
// 	{item:"service",dropdown:["aaa","bbb","ccc"]}
// ];

function aNavBar(data) {
	let { txt, menu } = data;
	return aDiv({
		styles: ["NavBar"], childs: [
			aDiv({
				styles: ["logo"], childs: [
					aImg({ styles: ["logoImage"], src: "/project/consult/img/logo.png" }),
				]
			}),

			aDiv({ styles: ["Menu"], childs: buildNavMenuHorizon({ menuItemName: menu }) })
		]
	});
}


function buildNavMenuHorizon(data) {

	let { menuItemName } = data;
	let NavMenu = [];
	for (let i = 0; i < menuItemName.length; i++) {
		const itemName = menuItemName[i];
		NavMenu.push(aText({ txt: itemName, type: "h2", styles: ["NavMenuTxt"] }));
	}
	return NavMenu;
}
function aMenuItem(data) {
	let { itemName ,dropDownArr} = data;
	return aDiv({
		styles: ["MenuItemGroup"], childs: [
			aText({ txt: itemName, type: "h2", styles: ["NavMenuTxt"] }),
			aDiv({
				styles: ["dropDownContent"], childs: [
					aText({txt:""})
				]
			}),
		]
	});
}
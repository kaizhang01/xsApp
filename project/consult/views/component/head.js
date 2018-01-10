function aStretchableNavBar(data) {
	let { stripData, navBarData } = data;
	return aDiv({
		styles: ["StretchableNavBar"], childs: [
			aStrip(stripData),
			aNavBar(navBarData),
		]
	});

}
function aStrip(data) {
	let { text } = data;
	return aDiv({
		styles: ["Strip"], childs: [
			aDiv({
				styles: ["StripHeadBox"], childs: [
					aText({ styles: ["StripHeadText"], txt: text }),
				]
			}),
			aDiv({
				styles: ["LanguageBox"], childs: [
					aImg({styles:["LanguageImg"],src:"/project/consult/img/language-china.jpg"}),
					aText({styles:["LanguageText"],txt:"China"})
				]
			}),
		]
	});
}
function aNavBar(data) {
	let { logo, menu } = data;
	return aDiv({
		styles: ["NavBar"], childs: [
			aDiv({
				styles: ["logo"], childs: [
					aImg({ styles: ["logoImage"], src: logo }),
				]
			}),

			aDiv({ styles: ["MenuBox"], childs: buildNavMenuHorizon(menu) })
		]
	});
}

function buildNavMenuHorizon(menu) {

	let NavMenu = [];
	for (let i = 0; i < menu.length; i++) {
		// NavMenu.push(aText({ styles: ["NavMenuTxt"],txt: itemName, type: "h2"}));
		NavMenu.push(aMenuItem(menu[i]));
	}
	return NavMenu;
}
function aMenuItem(data) {
	let { item, dropDown } = data;
	let dropDownList = aDropDownList({ dropDown: dropDown });
	return aDiv({
		styles: ["NavMenuItemBox"],
		childs: [
			aText({ txt: item, type: "h2", styles: ["NavMenuTxt"] }),
			dropDownList
		],
		onMouseover: MenuItemMouseOver,
		onMouseout: MenuItemMouseOut
	});
	function MenuItemMouseOver(evt) {
		setStyles(this, ["NavMenuItemBoxMouseover"]);
		if (dropDownList != undefined)
			show(dropDownList);
	}
	function MenuItemMouseOut(evt) {
		setStyles(this, ["NavMenuItemBox"]);
		if (dropDownList != undefined)
			hide(dropDownList);
	}
}


function aDropDownList(data) {
	let { dropDown } = data;
	if (dropDown == undefined)
		return undefined;
	return aDiv({
		styles: ["DropDownBox"], childs: buildDropDownList()

	});
	function buildDropDownList() {
		let list = [];
		for (let i = 0; i < dropDown.length; i++) {
			const text = dropDown[i];
			list.push(aDiv({
				styles: ["DropDownItemBox"],
				childs: [
					aDiv({ styles: ["DropDownItemSelector"] }),
					aText({ styles: ["DropDownMenuText"], txt: text, type: "h2" }),

				],
				onMouseover: dropDownItemMouseOver,
				onMouseout: dropDownItemMouseOut
			}));

		}
		return list;

		function dropDownItemMouseOver(evt) {
			let selector = this.childNodes[0];
			setStyles(selector, ["DropDownItemSelectorMouseover"]);

		}
		function dropDownItemMouseOut(evt) {
			let selector = this.childNodes[0];
			setStyles(selector, ["DropDownItemSelector"]);

		}
	}
}

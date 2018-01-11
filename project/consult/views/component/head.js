function aStretchableNavBar(data) {
	let { stripData, navBarData } = data;
	let div = aDiv({
		styles: ["StretchableNavBar"], childs: [
			aStrip(stripData),
			aNavBar(navBarData),
		]
	});
	window.oldScrollY = 0;
	window.addEventListener("scroll", function () {
		// 		console.log(window.scrollY);
		// div.style.top=-35+"px";
		let scrollDist = window.scrollY - window.oldScrollY;
		if (scrollDist > 0) {
			moveStrip({ from: 0, to: -35, duration: 200, beginStatus: ["show"], endStatus: "hide" });

		} else if (scrollDist < 0) {
			moveStrip({ from: -35, to: 0, duration: 200, beginStatus: ["hide"], endStatus: "show" })
		}
		window.oldScrollY = window.scrollY;
	});
	div.animation = {};
	div.animation.status = "show";
	function moveStrip(data) {
		let { from, to, duration, beginStatus, endStatus } = data;
		if (!matchStatus(beginStatus))
			return;
		div.animation.ID = requestAnimationFrame(function (timeStamp) {
			div.animation.startTime = timeStamp;
			div.animation.posY_from = from;
			div.animation.posY_to = to;
			div.animation.dist = div.animation.posY_to - div.animation.posY_from;
			update(timeStamp);
		});
		function update(timestamp) {
			div.animation.status = "moving";
			let runTime = timestamp - div.animation.startTime;
			let progress = runTime / duration;
			progress = Math.min(progress, 1);
			div.style.top = (div.animation.posY_from + div.animation.dist * progress) + "px";
			if (runTime < duration) {
				div.animation.ID = requestAnimationFrame(update);
			} else {
				div.animation.status = endStatus;
			}
		}
		function matchStatus(beginStatus) {
			for (let i = 0; i < beginStatus.length; i++) {
				const status = beginStatus[i];
				if (div.animation.status === status)
					return true;
			}
			return false;
		}
	}
	return div;
}
function aStrip(data) {
	let { text } = data;
	let StripHeadBox = aDiv({
		styles: ["StripHeadBox"], childs: [
			aText({ styles: ["StripHeadText"], txt: text }),
		]
	});
	let LanguageBox = aDiv({
		styles: ["LanguageBox"], childs: [
			aImg({ styles: ["LanguageImg"], src: "/project/consult/img/language-china.jpg" }),
			aText({ styles: ["LanguageText"], txt: "China" })
		],
		onMouseover: languageBoxMouseOver,
		onMouseout: languageBoxMouseOut

	});
	function languageBoxMouseOver() {
		setStyles(LanguageBox, ["LanguageBoxMouseOver"]);
	}
	function languageBoxMouseOut() {
		setStyles(LanguageBox, ["LanguageBox"]);
	}
	return aDiv({
		styles: ["Strip"], childs: [
			StripHeadBox,
			LanguageBox
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



function detectmob() {
	if (navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i)
	) {
		return true;
	}
	else {
		return false;
	}
}


function addComponents(componentsArr, onLoad) {
	let counter = componentsArr.length;
	for (let i = 0; i < componentsArr.length; i++) {
		const component = componentsArr[i];
		addComponent(component, loadOne);
	}
	function loadOne() {
		counter--;
		if (counter == 0)
			onLoad();
	}
	function addComponent(jsFileName, Fun) {
		let script = document.createElement('script');
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", jsFileName);
		script.onload = Fun;
		document.getElementsByTagName("head")[0].appendChild(script);

		let cssName = jsFileName.slice(0, jsFileName.indexOf('.js')) + '.css';
		addCss(cssName);
		function addCss(cssName) {
			let css = document.createElement("link");
			css.setAttribute("rel", "stylesheet");
			css.setAttribute("type", "text/css");
			css.setAttribute("href", cssName);

			document.getElementsByTagName("head")[0].appendChild(css);
		}

	}
}

function addJs(jsFiles, domPosition) {
	if (jsFiles == undefined || jsFiles.length == 0)
		return;
	for (let i = 0; i < jsFiles.length; i++) {
		const filename = jsFiles[i];
		let script = document.createElement('script');
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", filename);
		addtoDom(script, domPosition);
	}

	function addtoDom(script, domPosition) {
		if (domPosition === "head")
			document.getElementsByTagName("head")[0].appendChild(script);
		else if (domPosition === "body")
			document.body.appendChild(script);
	}
}

function addLibs(libFileArr) {
	addJs(viewFileArr, "head");
}

function addViews(viewFileArr) {
	addJs(viewFileArr, "body");
	if (viewFileArr == undefined) {
		return;
	}
	let cssFileArr = [];
	for (let i = 0; i < viewFileArr.length; i++) {
		const viewFileName = viewFileArr[i];
		let cssName = viewFileName.slice(0, viewFileName.indexOf('.js')) + '.css';
		cssFileArr.push(cssName);
	}
	addCSSs(cssFileArr);

}
function addCSSs(cssFileArr) {
	if (cssFileArr == undefined || cssFileArr.length == 0)
		return;
	for (let i = 0; i < cssFileArr.length; i++) {
		const filename = cssFileArr[i];
		var script = document.createElement("link");
		script.setAttribute("rel", "stylesheet");
		script.setAttribute("type", "text/css");
		script.setAttribute("href", filename);

		document.getElementsByTagName("head")[0].appendChild(script);
	}
}
function checkParamCorrect(params) {
	for (const p in params) {
		if (params[p] == undefined)
			throw `${p} is undefined, may be spell mistake:)`;
	}
}
function aMain(data) {
	let { id, styles, childs } = data;
	checkParamCorrect({ styles, childs });
	let div = createElement(id, 'div');
	addStyle(div, styles);
	document.body.appendChild(div);
	addChild(div, childs);

}
function addChild(element, childArr) {
	if (childArr == undefined)
		return;
	for (let i = 0; i < childArr.length; i++) {
		const child = childArr[i];
		if (childArr[i] != undefined)
			element.appendChild(child);
	}
}

function aDiv(obj) {
	let { id, parent, styles, childs, onMouseover, onMouseout, onClick } = obj;
	let div = createElement(id, 'div');
	addStyle(div, styles);
	addChild(div, childs);
	if (parent != undefined)
		parent.appendChild(div);
	if (onMouseover != undefined)
		div.addEventListener("mouseover", onMouseover, true);
	if (onMouseout != undefined)
		div.addEventListener("mouseout", onMouseout, true);
	if (onClick != undefined)
		div.addEventListener("click", onClick, true);

	return div;
}


function clearDiv(idStr) {
	let div = document.getElementById(idStr);
	div.innerHTML = "";
	defaultParent = div;
}
function deleteDiv(idStr) {
	let div = document.getElementById(idStr);
	deleteDivElement(div);
}
function insertDiv(idStr, insertBeforeElementIdStr) {
	var element = document.getElementById(insertBeforeElementIdStr);
	var div = document.createElement("div");
	element.parentNode.insertBefore(div, element);
}
function deleteDivElement(div) {
	if (div != null) {
		if (div == defaultParent)
			defaultParent = div.parentNode;
		div.parentNode.removeChild(div);
	}
}


function hideButton(buttonIdStr, trueOrFalse) {
	let button = document.getElementById(buttonIdStr);
	if (trueOrFalse == true) {
		button.style.visibility = 'hidden';
	} else {
		button.style.visibility = 'visible';
	}
}
function setButtonText(buttonIdStr, textStr, alterFun = null) {
	let button = document.getElementById(buttonIdStr);
	button.innerHTML = textStr;
	if (alterFun != null) {
		button.onclick = alterFun;
	}
}
function addRadioButton(nameStr, elementArr, onClickFun = null, parent = "") {
	let parentObj = getParent(parent);

	for (let i = 0; i < elementArr.length; i++) {

		let itemValue = elementArr[i];
		let button = document.createElement("input");
		button.type = "radio";
		button.name = nameStr;
		button.value = itemValue;
		button.id = nameStr + "-" + itemValue;
		parentObj.appendChild(button);
		let label = document.createElement("label");
		label.innerHTML = itemValue;
		label.htmlFor = button.id;
		parentObj.appendChild(label);
		addBR(parent);

		if (onClickFun != null) {
			button.onclick = onClickFun;
		}
	}
}
function checkRadio(idStr) {
	let radioButton = document.getElementById(idStr);
	radioButton.checked = true;
}
function unCheckAll(radioGroupName) {
	let radios = document.getElementsByName(radioGroupName);
	for (var i = 0; i < radios.length; i++) {
		var element = radios[i];
		element.checked = false;
	}
}
function getValueFromRadioGroup(nameStr) {
	let radios = document.getElementsByName(nameStr);
	for (let i = 0; i < radios.length; i++) {
		let radio = radios[i];
		if (radio.checked === true)

			return radio.value;
	}
	// return document.querySelector("input[name = " + nameStr + "]:checked").value;
}
function addCheckButton(nameStr, elementArr, onClickFun = null, parent = "") {
	let parentObj = getParent(parent);
	for (let i = 0; i < elementArr.length; i++) {
		let itemValue = elementArr[i];
		let button = document.createElement("input");
		button.type = "checkbox";
		button.name = nameStr;
		button.value = itemValue;
		// button.id = nameStr + "-" + itemValue;
		parentObj.appendChild(button);
		let label = document.createElement("label");
		label.innerHTML = itemValue;
		label.htmlFor = button.id;
		parentObj.appendChild(label);
		addBR(parent);

		if (onClickFun != null) {
			button.onclick = onClickFun;
		}
	}
}
function getValueFromCheckbox(nameStr) {
	var checkedValue = [];
	var inputElements = document.getElementsByName(nameStr);
	for (var i = 0; inputElements[i]; ++i) {
		if (inputElements[i].checked) {
			checkedValue.push(inputElements[i].value);
		}
	}
	return checkedValue;
}
function addStyle(element, styleArr) {
	if (styleArr == undefined) {
		console.log("style not defined")
		return;
	}
	for (let i = 0; i < styleArr.length; i++) {
		const style = styleArr[i];
		element.classList.add(style);
	}
}
function setStyles(element, styleArr) {
	if (styleArr == undefined) {
		console.log("style not defined");
		return;
	}
	// 	element.classList.length=0;
	for (let i = 0; i < element.classList.length; i++) {
		const style = element.classList[i];
		element.classList.remove(style);
	}
	for (let i = 0; i < styleArr.length; i++) {
		const style = styleArr[i];
		element.classList.add(style);
	}

}
function show(element) {
	element.style.visibility = "visible";
	element.show = true;
}
function hide(element) {
	element.style.visibility = "hidden";
	element.show = false;
}
function createElement(idStr, elementType) {
	let element;
	if (idStr != undefined) {
		element = document.getElementById(idStr);
		if (element == null)
			element = document.createElement(elementType);
		else {
			if (element.nodeName === elementType.toUpperCase()) {
				return element;
			}
			else {
				throw "id conflict";

			}
		}
		element.id = idStr;
	} else {
		element = document.createElement(elementType);
	}

	return element;
}
function aLink(data) {
	let { txt, href, id, styles } = data;
	let link = createElement(id, 'a');
	if (link == null)
		return null;
	link.href = href;
	link.innerHTML = txt;

	addStyle(link, styles);
	return link;
}

function addList(data) {
	let { txt, id, parent } = data;
	let li = createElement(id, "li");
	if (li == null)
		return null;
	li.innerHTML = txt;
	let parentObj = getParent(parent);
	parentObj.appendChild(li);
	return li;

}
function aImg(data) {
	let { id, src, styles } = data;
	let img = createElement(id, "img");
	if (img == null)
		return null;
	img.src = src;
	addStyle(img, styles);
	return img;
}


function aText(data) {
	let { txt, type, id, styles, onclick, onMouseover, onMouseout } = data;
	if (txt == undefined)
		throw "must have some text defined";
	if (type == undefined)
		type = "p";
	let text = createElement(id, type);
	if (text == null)
		return null;
	text.innerHTML = txt;
	addStyle(text, styles);
	if (onclick != undefined)
		text.onclick = onclick;
	else text.onclick = stopEvent;
	if (onMouseover != undefined)
		text.onmouseover = onMouseover;
	else text.onmouseover = stopEvent;

	if (onMouseout != undefined)
		text.onmouseout = onMouseout;
	else text.onmouseout = stopEvent;
	return text;
}
function stopEvent(evt) {
	// 	evt.stopImmediatePropagation();
}
function aForm(data) {
	let { action, method, id, styles, childs } = data;
	let form = createElement(id, "form");
	if (form == null)
		return null;
	form.action = action;
	form.method = method;
	addStyle(form, styles);
	addChild(form, childs);
	return form;
}
function aInput(data) {
	let { type, placeholder, name, id, styles } = data;
	let input = createElement(id, "input");
	if (input == null)
		return null;
	if (type != undefined) {
		input.type = type;
	} else {
		throw "input has no type definition"
	}
	if (placeholder != undefined)
		input.placeholder = placeholder;
	if (name != undefined)
		input.name = name;
	addStyle(input, styles);
	return input;
}

function aButton(data) {
	let { name, onclick, id, styles } = data;
	let button = createElement(id, "button");
	button.innerHTML = name;
	button.onclick = onclick;
	addStyle(button, styles);
	return button;
}


function addBR(parent = "") {
	let parentObj = getParent(parent);
	let lineBreak = document.createElement("br");
	parentObj.appendChild(lineBreak);
}
//custom table-------------------------------------------------
function addCell(textStr, classStr = "", wid = -1, parent = "") {
	let parentObj = getParent(parent);
	let cell = document.createElement("input");
	parentObj.appendChild(cell);
	cell.value = textStr;
	cell.readOnly = true;
	if (classStr != "") cell.className = classStr;
	if (wid != -1) cell.style.width = wid + "%";

}

function addTableHead(idStr, headArr, widArr, parent) {
	addDiv(idStr, parent);
	addRecord("listhead", headArr, widArr);

}
function addTableData(idStr, dataArr, widArr, parent) {
	addDiv(idStr, parent);
	for (let i = 0; i < dataArr.length; i++) {

		const record = dataArr[i];
		addDiv(idStr + "Record" + i, idStr, "record");
		addRecord("listdata", record, widArr);
	}
}
function addTotal(idStr, totalData, widArr, parent) {
	addDiv(idStr, parent);
	addCell("total:", "listdata", widArr[0]);
	addCell(totalData, "listdata", widArr[widArr.length - 1]);
}
function addTable(dataObj) {
	const { idStr, headArr, dataArr, widArr, parent } = dataObj;

	let parentObj = getParent(parent);
	var table = document.getElementById(idStr);
	if (table != null)
		table.innerHTML = "";
	else {
		addDiv(idStr);
	}

	addDiv("head", idStr);
	addRecord("listhead", headArr, widArr);
	let dataDiv = addDiv("data", idStr);

	for (let i = 0; i < dataArr.length; i++) {

		const record = dataArr[i];
		addDiv("dataRecord" + i, "data", "record");
		addRecord("listdata", record, widArr);
	}

}

function addRecord(className, dataArr, widArr = null, parent = "") {
	let parentObj = getParent(parent);
	for (let i = 0; i < dataArr.length; i++) {
		addCell(dataArr[i], className, widArr[i]);

	}

}
function getValue(id) {
	return document.getElementById(id).value;
}
function addCustomHeader(xhttp, headName, headContent) {
	if (headContent != undefined)
		xhttp.setRequestHeader(headName, headContent);
}
//send request------------------------------------
function sendRequest(obj) {//attempt change to obj parameter
	let { url, method, jsonObj, fun, type } = obj;
	if (type == undefined)
		type = "none";
	if (url == undefined) throw " need url to send request ";

	var xhttp = new XMLHttpRequest();
	if (method == undefined) method = "GET";
	xhttp.open(method, url, true);
	xhttp.setRequestHeader("x-requested-with", "XMLHttpRequest");
	addCustomHeader(xhttp, "type", type);
	if (method === "GET") {
		if (jsonObj != undefined)
			url += "?data=" + encodeURIComponent(JSON.stringify(jsonObj));

		xhttp.send();
	} else if (method === "POST") {
		xhttp.setRequestHeader("Content-Type", "text/plain");

		xhttp.send(jsonObj);
	} else if (method === "PUT") {
		xhttp.setRequestHeader("Content-Type", "text/plain");
		xhttp.send(jsonObj);
	}
	else if (method === "DELETE") {
		xhttp.send();
	}
	xhttp.onreadystatechange = function () {
		// 		if (this.status == 302) {
		// 			console.log("302");
		// 		}
		// if (this.readyState == 2) {
		// 	let redirectUrl = this.getResponseHeader("RedirectUrl");
		// 	if (redirectUrl != null)
		// 		directToUrl(redirectUrl);
		// }

		if (this.readyState == 4 && this.status == 200) {
			// 			console.log(this.responseText);

			if (fun != undefined)
				fun(this.responseText);
		}

	};

}
function directToUrl(url) {//link ref effect
	document.location.assign(url);
}
// function goDirectly(localUrl) {
// 	document.location.assign("http://" + window.location.host + localUrl);
// }

//language-------------------------------
function changeLanguage(language, fun) {

	sendRequest({
		url: `/changeLanguage/:${language}`, fun: function (language) {
			directToUrl(window.location.pathname);
			if (fun != undefined)
				fun();

		}
	});
}

function buildLanguageMap(map, fun) {

	let keysNum = Object.keys(map).length;
	for (let p in map) {
		getUIText(p, after);
	}
	function after(p, text) {
		map[p] = text;
		keysNum--;
		if (keysNum == 0) {
			document.body.languageMap = map;
			fun();
		}
	}
}
function getUIText(text, fun) {

	sendRequest({
		url: "/getUIText/:" + text, fun: function (res) {
			fun(text, res);
		}
	});

}

function UIText(text) {
	let languageMap = document.body.languageMap;
	if (languageMap[text] == undefined)
		return text;
	else
		return languageMap[text];

}



//animation

function animate(element, data, fun) {
	element.animationData =data;
	// if (!matchStatus(element.animationData.requiredStatus))
	// 	return;
	let { property, from, to, unit, duration } = data;
	let dist=to-from;
	element.animation.ID = requestAnimationFrame(function (timeStamp) {
		element.animation.startTime = timeStamp;
		update(timeStamp);
	});
	function update(timeStamp) {
		element.animation.status = "moving";
		let runTime = timeStamp - element.animation.startTime;
		let progress = runTime / duration;
		progress = Math.min(progress, 1);
		element.style[property] = (from + dist * progress) + unit;
		if (runTime < duration) {
			element.animation.ID = requestAnimationFrame(update);
		} else {
			element.animation.status = element.animationData.endStatus;
			if (fun != undefined)
				fun();
		}
	}
	function matchStatus(requiredStatuss) {
		for (let i = 0; i < requiredStatuss.length; i++) {
			const status = requiredStatuss[i];
			if (element.animation.status === status)
				return true;
		}
		return false;
	}

}
function mouseIsIn(mouseX, mouseY, rects) {

	for (let i = 0; i < rects.length; i++) {
		const rect = rects[i];
		// 		console.log(mouseX,mouseY,rect);
		if (mouseX >= rect.left && mouseX <= rect.right &&
			mouseY >= rect.top && mouseY <= rect.bottom)
			return true;
	}

	return false;
}

function mouseIsInRect(mouseX, mouseY, rect) {
	let l=Math.floor(rect.left);
	let r=Math.floor(rect.right);
	let t=Math.floor(rect.top) ;
	let b=Math.floor(rect.bottom);
// 		console.log(mouseX,"|",mouseY);
// 			console.log(l,r,"|",t,b);
	if (mouseX >l  && mouseX < r &&
		mouseY >t&& mouseY <b )
		return true;
	return false;
}
// function mouseIsInRect(mouseX, mouseY, rect) {
// 	if (mouseX >= rect.left && mouseX <= rect.right &&
// 		mouseY >= rect.top && mouseY <= rect.bottom)
// 		return true;
// 	return false;
// }
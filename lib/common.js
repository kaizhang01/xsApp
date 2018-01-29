

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


//dynamic add components
function addComponents(componentsArr, loadComplete) {
    if (document.body.components == undefined)
        document.body.components = [];
    let counter = componentsArr.length;
    for (let i = 0; i < componentsArr.length; i++) {
        loadOne(componentsArr[i]);
    }

    function loadOne(component) {
        if (!componentAlreadyLoad(component)) {
            addComponent(component, function (evt) {
                let script = evt.currentTarget;
                component = script.component;
                component.loadStatus = "done";
                for (let i = 0; i < component.waitMethods.length; i++) {
                    const waitMethod = component.waitMethods[i];
                    waitMethod();
                }
                counterDown();
            });
        }


        function counterDown() {
            counter--;
            if (counter == 0)
                loadComplete();
        }
        function componentAlreadyLoad(inspectComponent) {
            let allcomponents = document.body.components;
            for (let i = 0; i < allcomponents.length; i++) {
                const component = allcomponents[i];
                //                 console.log(script.src);

                if (inspectComponent === component.name) {
                    if (component.loadStatus === "processing") {
                        component.waitMethods.push(counterDown);
                        return true;
                    }
                    else if (component.loadStatus === "done") {
                        counterDown();
                        return true;
                    }
                }

            }
            return false;

        }
    }
    function addComponent(jsFileName, Fun) {
        let component = { name: jsFileName, loadStatus: "processing", waitMethods: [] };
        document.body.components.push(component);
        let script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", jsFileName);
        script.component = component;
        script.onload = Fun;
        document.getElementsByTagName("head")[0].appendChild(script);


        let filePath = jsFileName.slice(0, jsFileName.indexOf('.js'));
        fileExist(filePath, "css", function (isExist) {
            if (isExist === "yes") {
                let cssName = filePath + '.css';
                addCss(cssName);
            }
        });

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


function checkParamCorrect(params) {
    for (const p in params) {
        if (params[p] == undefined)
            throw `${p} is undefined`;
    }
}
//create element
function aMain(data) {
    let { id, styles, childs } = data;
    checkParamCorrect({ childs });
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
        if (Array.isArray(child) == true) {
            new addChild(element, child);
        } else {
            if (childArr[i] != undefined)//null == undefined
                element.appendChild(child);
        }

    }


}

function addTouch(element, obj) {
    let { onMouseover, onMouseout, onClick } = obj;
    if (onMouseover != undefined)
        element.addEventListener("mouseover", function (evt) {
            onMouseover(evt);
            evt.stopPropagation();
        }, false);
    if (onMouseout != undefined)
        element.addEventListener("mouseout", function (evt) {
            onMouseout(evt);
            // evt.stopPropagation();
        }, false);
    if (onClick != undefined)
        element.addEventListener("click", function (evt) {
            onClick(evt);
            evt.stopPropagation();
        }, false);

}
function aDiv(obj) {
    let { id, parent, styles, childs, save } = obj;
    let div = createElement(id, 'div');
    addStyle(div, styles);
    addChild(div, childs);
    if (parent != undefined)
        parent.appendChild(div);

    addTouch(div, obj);
    if (save != undefined) {
        div.save = {};
        for (let p in save) {
            div.save[p] = save[p];
        }
    }
    //     div.height = getComputedStyle(div,null).getPropertyValue('height');

    return div;

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
    if (element == undefined)
        return;
    if (element.show == true)
        return;
    element.style.visibility = "visible";
    element.show = true;
}
function hide(element) {
    if (element == undefined)
        return;
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

function aImg(data) {
    let { id, src, styles, onClick } = data;
    if (src == undefined || src == "") {
        // console.log("src not defined");
        return null;
    }
    let img = createElement(id, "img");
    if (img == null)
        return null;
    img.src = src;
    addStyle(img, styles);
    addTouch(img, data);

    return img;
}


function aText(data) {
    let { txt, translate, type, id, styles } = data;
    if (txt == undefined)
        throw "must have some text defined";
    if (type == undefined)
        type = "p";
    let text = createElement(id, type);
    if (text == null || text == "")
        return null;
    if (translate == undefined) {
        getUIText(txt, function (translated) {
            text.innerHTML = translated;
        });
    }
    else if (translate == "content") {
        getContentText(txt, function (translated) {
            text.innerHTML = translated;
        });

    }
    else if (translate == "no") {
        text.innerHTML = txt;
    }
    addStyle(text, styles);


    return text;
}


//send request------------------------------------
function addCustomHeader(xhttp, headName, headContent) {
    if (headContent != undefined)
        xhttp.setRequestHeader(headName, headContent);
}
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
        if (this.readyState == 4 && this.status == 200) {
            if (fun != undefined)
                fun(this.responseText);
        }

    };

}

function directToUrl(url) {//link ref effect
    document.location.assign(url);
}

//action-------------------------------
function checkAction(url) {
    if (url == undefined)
        return;
    directToUrl(url);



}

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
//file----------------------------------
function fileExist(filePath, filetype, fun) {
    sendRequest({
        url: `/fileExist/${filePath}/${filetype}`, fun: function (isExist) {
            fun(isExist);

        }
    });
}


function getUIText(text, fun) {

    sendRequest({
        url: "/getUIText/:" + encodeURI(text), fun: function (translated) {
            let decoded = decodeURI(translated);
            fun(decoded);
        }
    });

}

function getContentText(contentIndex, fun) {
    sendRequest({
        url: "/getContentText/:" + encodeURI(contentIndex), fun: function (text) {
            let f = b64DecodeUnicode(text);
            fun(f);
        }
    });
}
function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''));
}
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}



//animation

function animate(element, data, fun) {
    if (element == undefined)
        return;
    let { type, demensionObj } = data;
    if (type === "VerticalRollOut") {
        data.property = "height";
        data.unit = "px";
        data.from = 0;
        if (element.normalHeight != undefined)
            data.to = element.normalHeight;
        else {
            if (demensionObj == undefined)
                demensionObj = element;
            data.to = demensionObj.getBoundingClientRect().height;
            element.normalHeight = data.to;
        }
    }
    else if (type === "VerticalRollIn") {
        cancelAnimationFrame(element.animation.ID);
        data.property = "height";
        data.unit = "px";
        data.from = parseInt(element.style.height.slice(0, element.style.height.indexOf("px")));
        data.to = 0;
    }
    element.animationData = data;

    let { property, from, to, unit, duration } = data;
    let dist = to - from;
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


function mouseIsInRect(evt, element) {
    if (element == undefined)
        return false;
    let mouseX = evt.clientX;
    let mouseY = evt.clientY;
    let rect = element.getBoundingClientRect();
    let l = Math.floor(rect.left);
    let r = Math.floor(rect.right);
    let t = Math.floor(rect.top);
    let b = Math.floor(rect.bottom);
    // let trueExpress=(mouseX >= l && mouseX <= r) 
    // let trueExpress= (mouseX >= l && mouseX <= r) &&(mouseY >= t && mouseY <= b);
    // if (element.className == "DropDownBoxConnector"){
    //     console.log(mouseX, "|", mouseY);
    //     console.log(l, r, "|", t, b);
    //     console.log("trueExpress",trueExpress);

    // }
    if (mouseX >= l && mouseX <= r &&
        mouseY >= t && mouseY <= b)
        return true;
    return false;
}

//menu search
function findDefaultPath(pathArr) {
    let last = pathArr[pathArr.length - 1];

    let subMenu = last;
    while (subMenu.subMenu != undefined) {
        subMenu = subMenu.subMenu[0];
        pathArr.push(subMenu);
    }

}

function searchMenuTree(searchItem, mainMenu) {
    let level = 0;
    let find = false;
    let menuPath = new buildMenuPath(mainMenu);
    return menuPath;

    function buildMenuPath(menuTree) {
        let branchPath;
        level++;
        for (let i = 0; i < menuTree.length; i++) {

            if (find == true)
                break;

            branchPath = [];

            const branch = menuTree[i];
            branchPath.push(branch);
            if (branch.url != undefined) {
                let url = branch.url;
                let detailName = url.slice(url.indexOf("/detail/") + 8);
                if (detailName === searchItem) {
                    level--;
                    find = true;
                    return branchPath;

                }
            }
            if (branch.subMenu != undefined) {
                let newBranch = new buildMenuPath(branch.subMenu);
                if (newBranch != null)
                    addArrToArr(newBranch, branchPath);
            }
        }
        level--;
        return branchPath;


    }
    function addArrToArr(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            const e = arr1[i];
            arr2.push(e);
        }
    }
}
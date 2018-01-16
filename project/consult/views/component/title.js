

function aTitle(data) {
    let { childs } = data;
    return aDiv({
        styles: ["Title"],
        childs: [
            aText({ txt: "Information Bussiness Services", type: "h1", styles: ["Title-mainTxt"] }),
            aText({
                txt: "help build business architecture, information architecture,caber security, flow Chart diagram, help solve the problems in App Development",
                styles: ["Title-subTxt"]
            }),
        ]
    });
}
function aBanner(data) {
    let { img, title, subtitle, style } = data;
    if (style == undefined)
        style = "Banner";
    return aDiv({
        styles: [style],
        childs: [
            aImg({ styles: ["BannerImg"], src: img }),
            aDiv({
                styles: ["BannerText"], childs: [
                    aText({ styles: ["BannerTitle"], txt: title }),
                    aText({ styles: ["BannerSubtitle"], txt: subtitle }),
                ]
            }),

        ]

    });
}

function aPageNav(bannerArr) {
    return aDiv({
        styles: ["PageNav"], childs: buildPageDot(bannerArr)
    });

}
function buildPageDot(bannerArr) {
    let pageDotArr = [];
    for (let i = 0; i < bannerArr.length; i++) {
        let dotBack = aDiv({
            onMouseover: overDot,
            onMouseout: outDot,
            onClick: clickDot,
            styles: ["PageNavBack"], childs: [
                aDiv({ styles: ["PageNavDot"] }),
                aDiv({ styles: ["PageNavDotNormal"] })
            ]
        });
        dotBack.index = i;
        pageDotArr.push(dotBack);
        check(pageDotArr, 0);

    }


    function overDot(evt) {

        let selector = this.childNodes[1];
        setStyles(selector, ["PageNavDotSelect"]);


    }
    function outDot(evt) {
        if (this.checked == true)
            return;
        let selector = this.childNodes[1];
        setStyles(selector, ["PageNavDotNormal"]);

    }

    function clickDot(evt) {
        let bannerBox = this.parentNode.parentNode;
        if (bannerBox.animation.bannerStatus === "moving")
            return;
        if (bannerBox.currentPageIndex == this.index)
            return;

        let dot = this;
        check(pageDotArr, this.index);
        bannerBox.animation.bannerStatus = "moving";

        bannerBox.currentBanner.fromX = 0;


        let beginPos = -document.body.clientWidth;//not equal to window.innerWidth
        if (this.index > bannerBox.currentPageIndex) {
            beginPos *= -1;
        }

        let newBanner = aBanner(bannerArr[this.index]);
        newBanner.fromX = beginPos;
        newBanner.style.left = beginPos + "px";

        //insert before pageNav
        let childs = bannerBox.childNodes;
        bannerBox.insertBefore(newBanner, childs[childs.length - 1]);


        moveSimultaneously({
            bannerBox: bannerBox, banners: [newBanner, bannerBox.currentBanner], dist: 0 - beginPos, duration: 500,
            fun: function (oldbanner) {

                bannerBox.removeChild(bannerBox.currentBanner);
                bannerBox.currentPageIndex = dot.index;
                bannerBox.currentBanner = newBanner;
                bannerBox.animation.bannerStatus = "stop";
            }
        });


    }
    return pageDotArr;
}
function check(pageDotArr, index) {
    let oneDot = pageDotArr[index];
    for (let i = 0; i < pageDotArr.length; i++) {
        const dot = pageDotArr[i];
        if (dot == oneDot) {
            dot.checked = true;
            setStyles(dot.childNodes[1], ["PageNavDotSelect"]);
        }
        else {
            dot.checked = false;
            setStyles(dot.childNodes[1], ["PageNavDotNormal"]);
        }

    }
}

function moveSimultaneously(data) {
    let { bannerBox, banners, dist, duration, fun } = data;

    // let startTime;
    bannerBox.animation.update = update;
    bannerBox.animation.ID = requestAnimationFrame(function (timestamp) {
        bannerBox.animation.startTime = timestamp;
        // startTime = timestamp;
        update(timestamp);
    });

    function update(timestamp) {

        let runTime = timestamp - bannerBox.animation.startTime;
        let progress = runTime / duration;
        progress = Math.min(progress, 1);
        for (let i = 0; i < banners.length; i++) {
            const banner = banners[i];
            banner.style.left = (banner.fromX + dist * progress) + 'px';
        }
        if (runTime < duration) {

            bannerBox.animation.ID = requestAnimationFrame(update);
        } else {
            if (fun != undefined)
                fun(banners[1]);
        }
    }
}

function aBannerBox(data) {

    let { bannerArr } = data;

    let banner = aBanner(bannerArr[0]);
    let pageNav = aPageNav(bannerArr);

    //global-----------

    //-----------------
    let bannerBox = aDiv({
        styles: ["BannerBox"],
        childs: [
            banner,
            pageNav
        ],
        onMouseover: function (evt) {
            show(pageNav);
        },
        onMouseout: function (evt) {
            hide(pageNav);
        }
    });
    bannerBox.animation = {};
    bannerBox.currentBanner = banner;
    bannerBox.currentPageIndex = 0;
    bannerBox.animation.bannerStatus = "stop";//moving,paused,
    bannerBox.isMouseOver = false;


    let idle;//timer id
    let idleCounter = 0;
    let idleTime = 5000;
    idle = setInterval(() => {
        if (bannerBox.animation.bannerStatus !== "stop") {
            idleCounter = 0;
            return;
        }
        idleCounter += 1000;
        if (idleCounter > idleTime) {
            startScroll();
            idleCounter = 0;
        }
    }, 1000);

    function stopCountIdle() {

        clearInterval(idle);
    }

    window.onmousemove = window.onkeypress = function () {
        idleCounter = 0;
    };

    window.addEventListener('blur', function () {
        // 		console.log('blur');
        if (bannerBox.animation.bannerStatus === "moving") {
            bannerBox.animation.bannerStatus = "paused";
            cancelAnimationFrame(bannerBox.animation.ID);
            bannerBox.animation.escape = new Date().getTime();

        } else if (bannerBox.animation.bannerStatus === "stop") {
            bannerBox.animation.bannerStatus = "suspend";
        }

    }, false);

    window.addEventListener('focus', function () {
        // 		console.log('focus');
        if (bannerBox.animation.bannerStatus === "paused") {
            bannerBox.animation.escape = new Date().getTime() - bannerBox.animation.escape;
            bannerBox.animation.startTime = bannerBox.animation.startTime + bannerBox.animation.escape;
            requestAnimationFrame(bannerBox.animation.update);
            bannerBox.animation.bannerStatus = "moving";
        }
        if (bannerBox.animation.bannerStatus === "suspend") {
            bannerBox.animation.bannerStatus = "stop";
        }
    }, false);


    function startScroll() {
        bannerBox.animation.bannerStatus = "moving";
        bannerBox.currentBanner.fromX = 0;

        let beginPos = document.body.clientWidth;
        let index = bannerBox.currentPageIndex + 1;
        if (index >= bannerArr.length)
            index = 0;
        let pageDotArr = pageNav.childNodes;
        check(pageDotArr, index);
        let newBanner = aBanner(bannerArr[index]);
        newBanner.fromX = beginPos;
        newBanner.style.left = beginPos + "px";

        let childs = bannerBox.childNodes;
        bannerBox.insertBefore(newBanner, childs[childs.length - 1]);

        moveSimultaneously({
            bannerBox: bannerBox, banners: [newBanner, bannerBox.currentBanner], dist: 0 - beginPos, duration: 500,
            fun: function () {

                bannerBox.removeChild(bannerBox.currentBanner);
                bannerBox.currentPageIndex = index;
                bannerBox.currentBanner = newBanner;
                bannerBox.animation.bannerStatus = "stop";

            }
        });
    }

    return bannerBox;
}
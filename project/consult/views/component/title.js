

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
	let { img, title, subtitle } = data;
	return aDiv({
		styles: ["Banner"],
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
		if (bannerBox.isBannerMoving)
			return;
		if (bannerBox.currentPageIndex == this.index)
			return;

		let dot = this;
		check(pageDotArr, this.index);
		bannerBox.isBannerMoving = true;

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
			fun: function () {

				bannerBox.removeChild(bannerBox.currentBanner);
				bannerBox.currentPageIndex = dot.index;
				bannerBox.currentBanner = newBanner;
				bannerBox.isBannerMoving = false;
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

	let startTime;
	bannerBox.aniID = requestAnimationFrame(function (timestamp) {
		startTime = timestamp;
		update(timestamp);
	});
	
	function update(timestamp) {
		let runTime = timestamp - startTime;
		let progress = runTime / duration;
		progress = Math.min(progress, 1);
		for (let i = 0; i < banners.length; i++) {
			const banner = banners[i];
			banner.style.left = (banner.fromX + dist * progress).toFixed(2) + 'px';
		}
		if (runTime < duration) {
			bannerBox.aniID = requestAnimationFrame(update);
		} else {
			if (fun != undefined)
				fun();
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

	bannerBox.currentBanner = banner;
	bannerBox.currentPageIndex = 0;
	bannerBox.isBannerMoving = false;
	bannerBox.isMouseOver = false;


	let idle;
	let idleCounter = 0;
	idle = setInterval(() => {
		if (bannerBox.isBannerMoving) {
			idleCounter = 0;
			return;
		}
		idleCounter += 1000;
		if (idleCounter > 3000) {
			startScroll();
		}
	}, 1000);

	function stopCountIdle() {

		clearInterval(idle);
	}

	window.onmousemove = window.onkeypress = function () {
		idleCounter = 0;
	};

	window.addEventListener('blur', function () {
		console.log('blur');
		// cancelAnimationFrame(bannerBox.aniID);
	}, false);

	window.addEventListener('focus', function () {
		console.log('focus');
		// requestAnimationFrame(bannerBox.aniUpdate);
	}, false);


	function startScroll() {
		bannerBox.isBannerMoving = true;
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
			bannerBox: bannerBox, banners: [newBanner, bannerBox.currentBanner], dist: 0 - beginPos, duration: 2000, fun: function () {

				bannerBox.removeChild(bannerBox.currentBanner);
				bannerBox.currentPageIndex = index;
				bannerBox.currentBanner = newBanner;
				bannerBox.isBannerMoving = false;

			}
		});
	}

	return bannerBox;
}
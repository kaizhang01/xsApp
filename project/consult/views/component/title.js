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
function aPageNav(banner, bannersData) {
	let currentBanner = banner;
	let currentPageIndex = 0;
	let noclick = false;
	return aDiv({
		styles: ["PageNav"], childs: (function () {
			let pageDotArr = [];
			function check(oneDot) {
				currentPageIndex = oneDot.index;
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
			let animation = 0;
			function clickDot(evt) {

				if (animation)
					return;
				if (currentPageIndex == this.index)
					return;
				let dot=this;
				animation = 2;

				let speed = 1;
				let interval = 5;
				let fromX = 0;
				let toX = window.innerWidth;
				if (this.index > currentPageIndex) {
					speed *= -1;
					toX = -window.innerWidth;
				}

				moveBanner({
					banner: currentBanner,
					fromX: fromX,
					toX: toX,
					speed: speed,
					interval: interval,
					fun: function (banner) {
						banner.parentNode.removeChild(banner);
						checkAnimationEnd();
					}
				});



				let newBanner = aBanner(bannersData[this.index]);
				let parent = currentBanner.parentNode;
				let childs = parent.childNodes;
				parent.insertBefore(newBanner, childs[childs.length - 1]);

				speed = 1;
				interval = 5;
				fromX = -window.innerWidth;
				toX = 0;
				if (this.index > currentPageIndex) {
					speed *= -1;
					fromX = window.innerWidth;
				}
				moveBanner({
					banner: newBanner,
					fromX: fromX,
					toX: toX,
					speed: speed,
					interval: interval,
					fun: function (banner) {
						currentBanner = banner;
						checkAnimationEnd();
					}
				});


				function checkAnimationEnd() {
					animation--;
					if (animation == 0)
						check(dot);
					let selector = dot.childNodes[1];
					setStyles(selector, ["PageNavDotSelect"]);
				}

			}

			function moveBanner(data) {
				let { banner, speed, interval, fun, fromX, toX } = data;
				var pos = fromX;
				var id = setInterval(frame, interval);
				function frame() {
					if (pos == toX) {
						clearInterval(id);
						fun(banner);
					} else {
						pos += speed;
						banner.style.left = pos + 'px';
					}
				}
			}
			for (let i = 0; i < bannersData.length; i++) {
				let dotBack = aDiv({
					onMouseover: overDot,
					onMouseout: outDot,
					onClick: clickDot,
					styles: ["PageNavBack"], childs: [
						aDiv({ styles: ["PageNavDot"] }),
						aDiv({})
					]
				});
				dotBack.index = i;
				pageDotArr.push(dotBack);
				check(pageDotArr[0]);
			}
			return pageDotArr;
		})()

	});

}
function aBannerBox(data) {
	let { bannerArr } = data;
	let banner = aBanner(bannerArr[0]);
	return aDiv({
		styles: ["BannerBox"],
		childs: [
			banner,
			aPageNav(banner, bannerArr)
		]
	});

}
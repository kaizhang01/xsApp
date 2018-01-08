

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
		styles: ["PageNav"], childs:
			(function () {
				let pageDotArr = [];
				function check(oneDot) {
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

					let dot = this;
					check(this);
					animation = 2;

					let targetPos = window.innerWidth;
					if (this.index > currentPageIndex) {

						targetPos = -window.innerWidth;
					}
					let duration=500;
					move(currentBanner, { fromX: 0, toX: targetPos, duration: duration },
						function (banner) {
							banner.parentNode.removeChild(banner);
							animation--;
						}
					);



					let beginPos = -window.innerWidth;
					if (this.index > currentPageIndex) {

						beginPos = window.innerWidth;
					}

					let newBanner = aBanner(bannersData[this.index]);
					newBanner.style.left = beginPos + "px";
					let parent = currentBanner.parentNode;
					let childs = parent.childNodes;
					parent.insertBefore(newBanner, childs[childs.length - 1]);



					move(newBanner, { fromX: beginPos, toX: 0, duration: duration, },
						function (banner) {
							currentPageIndex = dot.index;
							currentBanner = newBanner;
							animation--;
						}
					);


					function move(banner, data, fun) {
						let { fromX, toX, duration } = data;
						let startTime;

						let reqAniRef=requestAnimationFrame(function (timestamp) {
							startTime = timestamp;
							update(timestamp);
						});

						function update(timestamp) {
							let dist = toX - fromX;
							let runTime = timestamp - startTime;
							let progress = runTime / duration;
							progress = Math.min(progress, 1);
							banner.style.left = (fromX + dist * progress).toFixed(2) + 'px'
							if (runTime < duration) { // if duration not met yet
								reqAniRef=requestAnimationFrame(update);

							} else {
								
								if (fun != undefined)
									fun(banner);
							}
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
							aDiv({ styles: ["PageNavDotNormal"] })
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
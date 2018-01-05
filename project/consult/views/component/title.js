function aTitle(data) {
	let { childs } = data;
	return aDiv({
		styles: ["Title"],
		childs: childs
	});
}
function aBanner(data) {
	let { imgsrc, title, subtitle} = data;
	return aDiv({
		styles:["Banner"],
		childs: [
			aImg({ styles: ["BannerImg"], src: imgsrc }),
			aText({ styles: ["BannerTitle"], txt: title }),
			aText({ styles: ["BannerSubtitle"], txt, subtitle }),
		]

	});
}
function aBannerBox(data) {
	let { bannerArr } = data;
	return aDiv({
		styles: ["BannerBox"],
		childs: [
			
		]
	});
	
}
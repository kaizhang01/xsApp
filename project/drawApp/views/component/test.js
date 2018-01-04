function atestComponent(data) {
	let { headTxt, contentTxt } = data;
	return aDiv({
		styles: ["testComponentMain"],
		childs: [
			aText({ txt: headTxt }),
			aText({ txt: contentTxt })
		],
	});

}

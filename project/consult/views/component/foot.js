function aFoot(data) {
	let{tradeMark}=data;
	return aDiv({
		styles: ["Foot"],
		childs: [
			aText({
				txt: tradeMark,
				styles: ["TradeMark"]
			}),
		]
	});
}

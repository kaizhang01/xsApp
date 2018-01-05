
addComponents([
	'/client/views/component/head.js',
	'/client/views/component/Component1.js'
], () => {
	aMain({
		childs: [
			aNavBar({
				txt:"Relaxslow",
				menu:["aaa",'bbb','ccc']
			}),
			atestComponent({
				headTxt: "hello component",
				contentTxt: " this is sub title"
			})
		]
	});
});


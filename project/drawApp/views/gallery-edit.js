addComponents([
	'/project/drawApp/views/component/head.js',
], main);

function main() {
	aDiv({
		styles: [
			"Main"
		],
		childs: [
			aNavBar({
				txt: "Relaxslow",
				menu: ["login", 'logout', 'ccc']
			}),
			aInputArtInfoForm(),
			aText({ txt: "/client/img/ali-merryChristamas.jpg" }),
		],
		parent: document.body,

	})
}

function aInputArtInfoForm() {

	return aDiv({
		styles: ['editArtForm'],
		childs: [
			aDiv({
				styles: ["inputGroup"],
				childs: [
					aInput({
						styles: ['formInput'], type: "text", placeholder: "name",
						id: "nameInput"
					}),
					aInput({
						styles: ['formInput'], type: "text", placeholder: "/client/img/ali-merryChristamas.jpg",
						id: "urlInput"
					}),
					aButton({
						styles: ["submitButton"], name: "update", onclick: function () {
							let defUrl = getValue("urlInput");
							if (defUrl == "")
								defUrl = "/client/img/ali-merryChristamas.jpg";

							sendRequest({
								url: `/${serverData.name}/:${serverData.id}`,
								method: 'PUT',
								jsonObj: JSON.stringify({
									name: getValue("nameInput"),
									img: defUrl,
									
								}),
								type:"checked--operate"
							});

						}

					})
				]
			}),

		]
	});

}
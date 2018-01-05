
addComponents([
	'/project/drawApp/views/component/head.js',
	'/project/drawApp/views/component/title.js'
],main);
 function main() {
	aMain({
		styles: ["Main"],
		childs: [
			aNavBar({
				txt: "Relaxslow",
				menu: ["aaa", 'bbb', 'ccc']
			}),
			aDiv({ styles: ["PageSide"] }),
			aDiv({
				styles: ["PageCenter"],
				childs: buildPageCenter()
			}),
			aDiv({ styles: ["PageSide"] })
		]
	});
};

//----------------------------------
function buildPageCenter() {
	return [
		aTitle({
			childs: [
				aText({ txt: "welcome to gallery", type: "h1", styles: ["Title-mainTxt"] }),
				aButton({ name: "add new ",  styles: ["LinkButton"] ,onclick:function(){
						sendRequest({
						url: `/gallery/New`,
						method: 'GET',
						
					});
				}})
			]
		}),
		aDiv({
			styles: ["Content"],
			childs: buildArtWorks()

		}),
	];
}
//-----------------------------------

function buildArtWorks() {
	let galleryData = serverData;
	let artWorks = [];
	for (let i = 0; i < galleryData.length; i++) {
		const pic = galleryData[i];
		artWorks.push(aArt(pic));
	}
	return artWorks;
}

function aArt(data) {
	let { name, img, _id } = data;
	return aDiv({
		styles: ["ArtWorkFrame"],
		childs: [
			aImg({ src: img }),
			aDiv({
				styles: ["ArtWorkTag"], childs: [
					aText({
						txt: "edit", styles: ["ArtWorkMenu"], onclick: function () {
							sendRequest({
								url: `/gallery/:${_id}/edit`,
								method: 'GET',
								
							});
						}
					}),
					aText({ txt: name, styles: ["ArtWorkName"] }),
					aText({
						txt: "delete", styles: ["ArtWorkMenu"], onclick: function () {
							sendRequest({
								url: `/gallery/:${_id}`,
								method: 'DELETE',
								type:"checked--opertate"
							});
						}
					}),
				]
			}),

		]
	});
}


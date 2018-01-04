
const xs = require('../../../server/xs.js');
const router = require('../../../server/router.js');
const render = require('../../../server/render.js');
const assert = require('assert');

const db = require('../db.js');


exports.map = {
	"listAll": LoadGallery,
	"showNewForm": loadCreateNewArt,
	"createNew": AddNewArtToDataBase,
	// "showOneInfo": router.nodef,
	"editOne": editArt,
	"updateOne": updateOne,
	"deleteOne": deleteOne,

};
exports.handler = function (req, res) {
	let { b_route } = res;


	exports.map[b_route](req, res);
};

function LoadGallery(req, res) {
	db.Gallery.find({}, function (err, gallery) {
		assert(err == null, err);
		render.html(res, {
			view: "/client/views/gallery.js",
			data: gallery
		});

	});
}
function AddNewArtToDataBase(req, res) {

	xs.getBody(req, function (body) {
		let newPic = body;
		db.Gallery.create(newPic, function (err, gallery) {
			assert(err == null, err);
			console.log("add to gallery ok,redirect...");
			router.redirect(res, "/gallery");

		});
	});


}

function loadCreateNewArt(req, res) {
	render.html(res, {
		view: "/client/views/gallery-new.js",
	});
}


function editArt(req, res) {
	render.html(res, {
		view: "/client/views/gallery-edit.js",
		data: { name: res.b_name, id: res.b_Id }
	});

}
function updateOne(req, res) {
	xs.getBody(req, function (body) {
		db.Gallery.findById(res.b_Id, (err, artWork) => {
			// Handle any possible database errors
			if (err) {
				res.status(500).send(err);
			} else {
				// Update each attribute with any possible attribute that may have been submitted in the body of the request
				// If that attribute isn't in the request body, default back to whatever it was before.
				artWork.name = body.name;
				artWork.img = body.img;

				// Save the updated document back to the database
				artWork.save((err, artWork) => {
					if (err) {
						res.status(500).send(err);
					}
					console.log("update gallery ok,redirect...");
					router.redirect(res, "/gallery");
				});
			}
		});

	});

}

function deleteOne(req, res) {
	db.Gallery.findByIdAndRemove(res.b_Id, (err, todo) => {
		router.redirect(res, "/gallery");
	});
}

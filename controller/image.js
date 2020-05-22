const Clarifai = require('clarifai');

// always have API key in your backend or people can access to it
const app = new Clarifai.App({
  apiKey: '9ac9e216202641e2b6913032751c76bb'
});

const handleAPI = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(404).json('not found'))
}

module.exports = {
	handleImage: handleImage,
	handleAPI: handleAPI
}
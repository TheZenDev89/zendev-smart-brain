const Clarifai = require('clarifai');

//The next line defines the API key and stores it in 'app'
const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API
});

//'app' has the API key stored in it as a value(I think)
//Next line lets the site give the URL as the input (URL = input)
const handleAPICall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => {res.status(400).json('Unable to cALL API.')})
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    //knex method for incrementing --> we want to increment the entry count, therefore:
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Error getting entries.'))
}

module.exports = {
    handleImage,
    handleAPICall
}
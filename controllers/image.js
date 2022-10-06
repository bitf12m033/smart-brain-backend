
const Clarifai = require('clarifai')

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '2b4e396ef698471192714827c16166c1'
});

// HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
// A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
// for the Face Detect Mode: https://www.clarifai.com/models/face-detection
// If that isn't working, then that means you will have to wait until their servers are back up. Another solution
// is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
// so you would change from:
// .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
// to:
// .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
const handleApiCall = (req , res) => {
  app.models
  .predict(  Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data => {
    res.json(data)
  })
  .catch(err => res.status(400).json("Unable to work with API"))

}
const handlerImage = (req , res,pg) => {
  const {id} = req.body;
  pg('users').where('id','=', id)
            .increment('entries',1)
            .returning('entries')
            .then(entries =>{
              res.json(entries[0].entries);
            })
            .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
  handlerImage:handlerImage,
  handleApiCall:handleApiCall
}

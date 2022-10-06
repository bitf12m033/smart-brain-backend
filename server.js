const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const pg = require('knex')({
  client: 'pg',
  connection: {
      host : '127.0.0.1',
      // port : 3306,
      user : 'postgres',
      password : 'postgres',
      database : 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors());

// routes

app.get('/' , (req , res) => {
  res.json(database.users)
})

app.post('/signin' , signin.handlerSignin( pg , bcrypt));

app.post('/register' ,(req , res) => {register.handlerRegister (req , res , pg , bcrypt)})

app.get('/profile/:id' , (req , res) => {profile.handlerProfile (req , res , pg )})

app.put('/image' , (req , res) => {image.handlerImage (req , res , pg )})
app.post('/imageurl' , (req , res) => {image.handleApiCall(req , res )})
// routes

app.listen(3001, () => {
  console.log('App is running on port 3001');
})

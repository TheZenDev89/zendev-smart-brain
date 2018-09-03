const express = require('express');
const app = express();
//REMEMBER: When sending data from the front-end, you need to parse it! Hence:
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : 'postgresql-deep-23563',
        user : 'christophernreeves',
        password : '',
        database : 'smart-brain'
    }
});

app.use(cors());
//(AFTER app variable has been created ABOVE): Use body-parser (which is middleware) to parse json data as below:
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('It is working!') })

app.post('/signIn', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageURL', (req, res) => { image.handleAPICall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on ${process.env.PORT}`);
})

/*
// API planning:
KEY: A. ROUTE --> B. TYPE OF REQUEST --> C. RETURN/RESPONSE VALUE
1. / (root)         --> response = 'This is working.'
2. /signin          --> POST (because we're posting user info {JSON}) --> success/fail
3. /register        --> POST (because we're adding data to the database (variable on server)) --> new user
4. /profile/:userId --> GET (getting user info) --> user
5. /image (ranking) --> PUT (because we're updating the user info/ranking) --> updated user (count)
*/
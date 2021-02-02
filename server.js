const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'josuecassab',
      password : 'your_database_password',
      database : 'smart-brain'
    }
  });

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('success')
} )

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })





app.listen(3000, ()=> {
    console.log('app is running in the port 3000')
})
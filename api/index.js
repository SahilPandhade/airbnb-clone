const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser')

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'iabfiwhifhwoi8729ue9hiqfoafln'

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

mongoose.connect(process.env.MONGO_URL)

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e)
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
                name: userDoc.name
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc)
            })
        }
        else {
            res.status(401).json('Invalid credentials')
        }
    }
    else {
        res.json('not found')
    }
})


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            const userDoc = await User.findById(user.id);
            res.json(userDoc)
        })
    } else {
        res.json(null);
    }
})
app.listen(4000)
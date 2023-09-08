const fs = require('fs');
const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')
const Place = require('./models/Place.js')
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
const imageDownloader = require('image-downloader');
const multer = require('multer')

app.use('/uploads', express.static(__dirname + '/uploads'))
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

app.post('/logout', (req, res) => {
    res.cookie('token', '').json()
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

app.post('/upload-by-link', cors({ credentials: true, origin: 'http://localhost:5173' }), (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + ".jpg"
    imageDownloader.image({
        url: link,
        dest: path.join(__dirname, 'uploads', newName)
    }).then((response) => {
        console.log("response: " + response.filename)
        res.json("uploads/" + newName)
    }).catch((err) => {
        console.log("Error uploading file by link", err);
    })
})

const photosMiddleWare = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleWare.array('photos', 100), (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);
        console.log("path: " + path + " newPath: " + newPath)
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    console.log("uplaoded files", uploadedFiles)
    res.json(uploadedFiles);
})

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            photos:addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests
        })
        res.json(placeDoc)
    })
})

app.get('/places', (req,res)=>{
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData
        res.json(await Place.find({owner:id}))
    })
})

app.get('/places/:id',async (req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id));
})

app.put('/places',async (req,res)=>{
    const { token } = req.cookies;
    const { id,title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {   
        const placeDoc = await Place.findById(id);
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,
                address,
                photos:addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests
            })
            await placeDoc.save()
            res.json('ok')
        }
    })
})

app.listen(4000)
const fs = require('fs');
const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')
const Place = require('./models/Place.js')
const Booking = require('./models/Booking.js')
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

//connect to mongodb
mongoose.connect(process.env.MONGO_URL)

//function to get user data from req
function getUserDataFromReq(req) {
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => { 
            if(err) throw err;
            resolve(userData);
        })
    })
}

//POST request to db to store registered user data
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

//POST request to db to log in existing user.
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

//Log out
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

//get profile
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            const {name,email,_id} = await User.findById(user.id);
            res.json({name,email,_id})
        })
    } else {
        res.json(null);
    }
})

//upload a image by link
app.post('/upload-by-link', cors({ credentials: true, origin: 'http://localhost:5173' }), (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + ".jpg"
    imageDownloader.image({
        url: link,
        dest: '/uploads/' + newName
    }).then((response) => {
        res.json(newName)
    }).catch((err) => {
        console.log("Error uploading file by link", err);
    })
})

//upload image files
const photosMiddleWare = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleWare.array('photos', 100), (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;   //new name of uploaded file with the appropriate extension
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
})

//Store info about place
app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests ,price} = req.body;
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
            maxGuests,
            price
        })
        res.json(placeDoc)
    })
})

//get user-place data
app.get('/user-places', (req,res)=>{
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData
        res.json(await Place.find({owner:id}))
    })
})

//get a specific place data
app.get('/places/:id',async (req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id));
})

//update place info
app.put('/places',async (req,res)=>{
    const { token } = req.cookies;
    const { id,title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests,price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {  
        if(err) throw err; 
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
                maxGuests,
                price
            })
            await placeDoc.save()
            res.json('ok')
        }
    })
})

//get all places
app.get('/places',async (req,res)=>{
    res.json( await Place.find() )
})

//make a booking
app.post('/booking', (req,res) =>{
    const {place,checkIn,checkOut,numberOfGuests,name,mobile,price} = req.body;
    Booking.create({
        place,checkIn,checkOut,numberOfGuests,name,mobile,price,
        user:userData.id
    }).then((doc)=>{
        res.json(doc)
    }).catch((err)=>{
        throw err;
    })
})

//get all bookings by a user
app.get('/bookings',async (req,res)=>{
    const userData = await getUserDataFromReq(req)
    res.json(await Booking.find({user : userData.id}).populate('place'))
})

app.listen(4000)
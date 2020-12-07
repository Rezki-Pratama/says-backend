const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { sequelize, User, Message, Image} = require('./models')
const socket = require('socket.io')
const multer = require('multer') //Multipart form data
const crypto = require('crypto')
const path = require('path')


const app = express()
//Set body parser for HTTP post operation
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//Set static asstes to public directory
app.use(express.static('public'))
const uploadDir = '/img/'
const storage = multer.diskStorage({
    destination: "./public" + uploadDir,
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if(err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    } 
})
const upload = multer({
    storage: storage,
    dest: uploadDir,
})

app.post('/uploadImage',upload.single('image'), async (req, res) => {

    try {
        const image = await Image.create({
            image: req.file === undefined ? "" : uploadDir + req.file.filename,
            userId: 2 
        })

        console.log(image)

        return  res.json(image);
    } catch (error) {
        console.log(error)
            
        return  res.status(500).json(error);
    }
})


// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     next()
// });

let routes = require('./routes/routes')
routes(app)

const server = app.listen({ port: 5000 }, async () => {
    console.log('Server up on post 5000')
    await sequelize.authenticate()
    console.log('Database connected')
})

const io = socket(server)

const users = []

io.on('connection', (socket)=>{
    console.log('User connected', socket.id)

    require('./controller/message')(socket, io, users)

})
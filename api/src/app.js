const express = require('express');
const fileUpload=require('express-fileupload')
const routes= require('./routes/index.js')
const morgan=require('morgan');
const server = express();


server.use(express.json())
server.use(morgan('dev'))

//para subir archivo a cloudinary
server.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
  }))

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use('/', routes);

module.exports= server;
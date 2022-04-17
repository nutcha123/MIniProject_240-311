const express = require('express');
const app = express();
//const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const PORT = 80 ;

var MongoClient = require('mongodb').MongoClient;
// Connect to the db 
MongoClient.connect("mongodb://@localhost:27017/MiniProject", { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
    if (!err) {
        console.log("You are connected!");
    };
   // db.close();
   
});

require('./config/Passport')
const authRouter = require('./route/authRouter')
const chanomRouter = require('./route/chanomRouter')

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', authRouter)
app.use('/chanom', chanomRouter)


app.listen(PORT,()=>console.log('Server is running :',PORT))
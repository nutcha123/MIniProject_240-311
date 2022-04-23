const express = require('express');
const app = express();
//const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const PORT = 3001 ;

//var MongoClient = require('mongodb').MongoClient;
// Connect to the db 
// MongoClient.connect("mongodb://myUser:myUser@localhost:27018/codemobile", { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
//     if (!err) {
//         console.log("You are connected!");
//     };
//     db.close();
// });

require('./Config/Passport')
const authRouter = require('./Route/AuthRoute')
const chanomRoute = require('./Route/ChanomRoute')

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', authRouter)
app.use('/chanom', chanomRoute)


app.listen(PORT,()=>console.log('Server is running :',PORT))

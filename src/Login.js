const mongoose = require('mongoose');
const {Schema} = mongoose;

//Defining login schema
const loginSchema = new mongoose.Schema({
    favorites: String,
    saved: String,
    name: String 
});

const Login = mongoose.model('', loginSchema);

const userData = [
    new loginSchema ({favorites: '', saved: '', name: ''})
];

const Dburl = process.env.Mongoose

mongoose.connect(Dburl)
.then(() =>{
    console.log("Connected")
    Login.insertMany(userData);
})

module.exports = Login 
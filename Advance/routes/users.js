// install mongodb
// install mongoosejs
// require mongoose and setup connection
// make Schema
// create modle and export

const mongoose = require('mongoose');
//creating connection
mongoose.connect("mongodb://127.0.0.1:27017/practicedb");


//creating schema
const userschema = mongoose.Schema({
  username : String,
  name : String,
  age : Number
});

//create model and export
 
module.exports = mongoose.model("user", userschema);



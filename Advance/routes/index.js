var express = require('express');
var router = express.Router();
const userModel = require('./users');

// router.get('/', function(req, res){
//   res.render("index")
// })

router.get('/contact', function(req, res){
  res.render("contact")
})

//------------------------------------------------------------------------
// //creating document in collection

// //   this is aasynchronus function which is execute after synchronus function 
// //   but i want to execute function first so that 
// //   i am using "awiat" and and awiat is come always with "async"

router.get('/create' ,async function(req, res){
  const createduser = await userModel.create({
    username : "moturam",
    age : 27,
    name : "motu"
  });
  res.send(createduser);
});
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// show all document in collection
router.get("/find" , async function(req , res){
  const alluser = await userModel.find();
  res.send(alluser);
})
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
//show only one document
router.get("/find" , async function(req , res){
  const alluser = await userModel.findOne({name: "chhotu"});
  res.send(alluser);
})
//--------------------------------------------------------------------------



//--------------------------------------------------------------------------
//Delete one document from collection

router.get('/deleteone', async function(req, res ){
 const deleteduser =  await userModel.findOneAndDelete({
    name: "chhotu"
  })
  res.send(deleteduser);
})
//--------------------------------------------------------------------------



//--------------------------------------------------------------------------
//Session
//creating sessions

router.get("/session" , function(req , res){
  req.session.ban = true;
  res.render("index");
})

//checking the session
router.get("/checksession", function(req, res){
  if (req.session.ban == true){
    res.send("You are banned");
  }
  else{
    res.send("You are active !!")
  }
})

//delete session
router.get("/deletesession", function(req, res){
  req.session.destroy(function(err){
    if (err) throw err;
    res.send("Ban removed !!!")
  })
})
//--------------------------------------------------------------------------


//--------------------------------------------------------------------------
//Cookies
//creating cookie
router.get("/cookies", function(req, res){
  res.cookie("age",25);
  res.send("Cookie created !!");
})

//Read the cookie
router.get("/readcookies",function(req, res){
  var coo = req.cookies.age;
  res.send("cookie is "+ coo);
})

router.get("/deletecookies", function(req, res){
  res.clearCookie("age");
  res.send("All cookies cleared !!")
})
//--------------------------------------------------------------------------


module.exports = router;

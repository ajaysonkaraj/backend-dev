var express = require('express');
var router = express.Router();
const userModel = require('./users');

router.get('/', function(req, res){
  res.render("index")
})

router.get('/contact', function(req, res){
  res.render("contact")
})

//------------------------------------------------------------------------
// //creating document in collection

// //   this is aasynchronus function which is execute after synchronus function 
// //   but i want to execute function first so that 
// //   i am using "awiat" and and awiat is come always with "async"

// router.get('/create' ,async function(req, res){
//   const createduser = await userModel.create({
//     username : "moturam",
//     age : 27,
//     name : "motu"
//   });
//   res.send(createduser);
// });
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// show all document in collection
router.get("/find" , async function(req , res){
  const alluser = await userModel.findOne({name: "chhotu"});
  res.send(alluser);
})
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
//show only one document
// router.get("/find" , async function(req , res){
//   const alluser = await userModel.findOne({name: "chhotu"});
//   res.send(alluser);
// })
//--------------------------------------------------------------------------



//--------------------------------------------------------------------------
//Delete one document from collection

// router.get('/deleteone', async function(req, res ){
//  const deleteduser =  await userModel.findOneAndDelete({
//     name: "chhotu"
//   })
//   res.send(deleteduser);
// })
//--------------------------------------------------------------------------
module.exports = router;

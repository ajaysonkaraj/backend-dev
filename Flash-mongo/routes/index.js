var express = require('express');
var router = express.Router();

const userModel = require('./users');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

//---------------------------------------------------------------------
router.get('/failed', function(req , res) {
  req.flash("age", 25 ) ;
  req.flash("name", "ajay");             //("give name anything", data)
  res.send("failed");
});

router.get('/checkflash', function(req, res){
  console.log(req.flash("age") );
  console.log(req.flash("name"));
  res.send("check your console");
});
//---------------------------------------------------------------------
//---------------------------------------------------------------------

//mongodb

router.get('/create',async function(req, res){
  let userdata = await userModel.create({
    username : "Tikesh",
    nickname : "tikku",
    description : "he is currently working on InterBiz software company",
    categories : ["aws", "docker", "git"],
  });
  res.send(userdata);
});

//---------------------------------------------------------------------
// router.get('/find', async function(req, res){
// //   // ^ this use for start with and  & used for end with ^exact$,
// //   // "i" is used for insensitive ( upper case and lower case dosn't matter)
//   var regex = new RegExp("^ajay$", "i");
//   let uesrdata = await userModel.find({username: regex});
//   res.send(uesrdata);
// });
//---------------------------------------------------------------------

// router.get('/find', async function(req, res){
//   var regex = new RegExp("^developer$", "i");
//   let uesrdata = await userModel.find({categories:  {$all : [regex]}});
//   res.send(uesrdata);
// });
//---------------------------------------------------------------------

// router.get('/find', async function(req, res){
//   let userdata = await userModel.find({categories: {$all :['developer', 'react']}})
//   res.send(userdata);
// });

router.get('/finddate', async function(req, res){
   var date1 = new Date('2024-03-20');
   var date2 = new Date('2024-03-21');
   let userdata = await userModel.find({datecreated: {$gte: date1, $lte: date2}});
   res.send(userdata);
});

router.get('/userexists', async function(req, res){
  let userdata = await userModel.find({categories: {$exists : true}})
  res.send(userdata);
});

router.get('/find', async function(req, res){
  let userdata = await userModel.find({
    $expr:{
      $and : [
        // <!-- nickname length 0 to 5 -->
        {$gte:[{$strLenCP: '$nickname'},0]},
        {$lte:[{$strLenCP: '$nickname'},5]}
      ]    
    }
  })
  res.send(userdata);
});
module.exports = router;

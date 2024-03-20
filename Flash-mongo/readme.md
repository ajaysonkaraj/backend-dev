1. Install connect-flash
2. maek sure you setup express-session (must)
3. make sure you put connect flash in a app.use function

- flash allow to use data from one route to another route 
- suppose there is user who enterd wrong id and password soyou need to give wrong id password alert, for this you have to go another route insteed of home page 

app.js
```
const expressSession = require('express-session');
const flash = require('connect-flash');


app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "algo"
}))

app.use(flash());
```

index.js

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

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

module.exports = router;

```

### MongoDB

- Connect to localhost and mongodb
user.js
```
<!-- flashmongo is a database name -->
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/flashmongo");
```
- Schema designing
```
const userSchema = mongoose.Schema({
  username: String,
  nickname: String,
  description: String,
  categories :{
    type : Array,
    default: []
  },
  
  datecreated: {
    type: Date,
    default: Date.now()
  }
})
```
- Exprot  schemma and collection name
```
<!-- here "user" is collection name -->
module.exports = mongoose.model("user", userSchema);
```

#### Routing and operations

```
router.get('/create',async function(req, res){
  let userdata = await userModel.create({
    username : "Ajay",
    nickname : "ajju",
    description : "hello I am a full stack developer",
    categories : ["developer", "react","nodejs","git"],
  });
  res.send(userdata);
});
```
- How can I perform a case-insensitive search in the database ?
```
router.get('/find', async function(req, res){
 <!-- ^ this use for start with and  & used for end with ^exact$,
 "i" is used for insensitive ( upper case and lower case dosn't matter) -->
  var regex = new RegExp("^ajay$", "i");
  let uesrdata = await userModel.find({username: regex});
  res.send(uesrdata);
});
```
- How do i find documents where an array field contains all of a set of values ?
```
router.get('/find', async function(req, res){
  var regex = new RegExp("^developer$", "i");
  let uesrdata = await userModel.find({categories:  {$all : [regex]}});
  res.send(uesrdata);
});
```
select multiple categories
```
router.get('/find', async function(req, res){
  let userdata = await userModel.find({categories: {$all :['developer', 'react']}})
  res.send(userdata);
});
```

- how can I for document with a specific date range in Mongoose?
```
router.get('/finddate', async function(req, res){
  <!-- ('yyyy-MM-dd') -->
   var date1 = new Date('2024-03-20');     
   var date2 = new Date('2024-03-21');
   <!-- gte = greater then equal, lte = less then equal -->
   let userdata = await userModel.find({datecreated: {$gte: date1, $lte: date2}});
   res.send(userdata);
});
```

- How can I filter documents based on the existence of a field in mongoose?
```
router.get('/userexists', async function(req, res){
  let userdata = await userModel.find({categories: {$exists : true}})
  res.send(userdata);
});
```

- How can I filter documents based on specific fields length's in Mongoose?
```
router.get('/find', async function(req, res){
  let userdata = await userModel.find({
    $expr:{
      $and : [
        <!-- nickname length 0 to 5 -->
        {$gte:[{$strLenCP: '$nickname'},0]},
        {$lte:[{$strLenCP: '$nickname'},5]}
      ]    
    }
  })
  res.send(userdata);
});
```

### Advance Topics
- Install MongoDB
- Cookies and Session
 **Session (Server)**
```
# npm i express-session
```
- app.js, 
```

var session = require('express-session')

app.use(session({
  resave : false,               // save only new session 
  saveUninitialized : false,
  secret: "encription algorithm"
}));
```
**whenever server will restart, sessions will be cleared**

- index.js
```
//creating sessions

router.get("/session" , function(req , res){
  req.session.ban = true;    
  <!-- ban is just example we can give name anithing
   to the session -->
  res.render("index");
})
```
```
//checking/Read the session

router.get("/checksession", function(req, res){
  if (req.session.ban == true){
    res.send("You are banned");
  }
  else{
    res.send("You are active !!")
  }
})
```
```
//delete session

router.get("/deletesession", function(req, res){
  req.session.destroy(function(err){
    if (err) throw err;
    res.send("Ban removed !!!")
  })
})
```
**Cookies (Client)**

- app.js
```
var cookieParser = require('cookie-parser');
app.use(cookieParser());
```

- index.js
```
//creating cookie

router.get("/cookies", function(req, res){
  <!--res.cookie("name", value)-->
  res.cookie("age",25);   
  res.send("Cookie created !!");
})
```
```
//Read the cookie

router.get("/readcookies",function(req, res){
  <!-- req.cookies.name -->
  var coo = req.cookies.age;
  res.send("cookie is "+ coo);
})
```
```
//Delete the cookie

router.get("/deletecookies", function(req, res){
  <!-- res.clearCookie("name") -->
  res.clearCookie("age");
  res.send("All cookies cleared !!")
})

```
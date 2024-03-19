
### Basics notes

# Nodejs
- to start 
```
# npx nodemon // if folder structure is gen by express-generator
//or
# npx nodemon app.js
// or 
# node app.js
```


1. install node  
02. import and export 
03. run the code
04. npm usage ,express, middleware
05. http methods (get ,post, put. delete, patch etc.)
6. 
```
app.get('/', function(re ,res, next){
    res.send("passing messages")
})
```
- res => it has control to send data from server (response)
- req => users details such as location devise info etc. (Request)
- next => help to moving cotrols from middleware and switch to next raoutes

07. Route
- to make any route Dynamic you can use : at the place where 
- you want to make it Dynamic and access there value using 
- req.params.username   --> here uesrname is just example you can give any thing insteed fo username
```
app.get('/profile/:username' , function(req, res){
  res.send(`hellow mr/mrs ${req.params.username}`);
})
```
- in the browser ---> "www.facebook.com/profile/ajay"
- in the backend ---> "www.facebook.com/profile/:username"

08. Template engines  (pug, handlebars ,ejs, jade)
- install express and ejs
- set view engines 
``` 
app.set("view engine", "ejs");
// express static file setup
app.use(express.static('./public'));  //find all the static files in the public directory
```
- create ** view ** (for ejs file) and ** publuc **(stylesheet, css, javascript files) directory
- render ejs files inside route
```
app.get('/contact' , function(req, res){
  res.render("contact")
})
```
- Use name in ejs file
```
app.get('/', function(req, res){
res.render("index", {name : "Ajay"});  
```
```
<h1> Your name is  <%= name %>  </h1>
```  
use this anywhere you want
})


09. Error handling


```
app.get('/error', function(req, res){
  throw Error("page is created by Ajay")
})
```
```
//after last route
app.use(
  function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  }
)
```

in the { error: err }, err is params error is object passing in 'error' page


### Advanced notes

- install express
- express-generator 
- create basic file structure
- start app
```
# npm i express 
# npm i express-generator -g
# express appname --view=ejs
# cd appname
# npm i
# npx nodemon
```
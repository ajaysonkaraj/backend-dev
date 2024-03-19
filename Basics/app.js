const express = require('express');

var app = express();

app.set("view engine", "ejs");
app.use(express.static('./public'));

app.use(function(req,res, next){
  console.log("middleware working testing");
  next();
})





app.get('/', function(req, res){
    res.render("index");
})

app.get('/error', function(req, res){
  throw Error("page is created by Ajay")

})

app.get('/profile/:username' , function(req, res){
  res.send(`hellow mr/mrs ${req.params.username}`);
})

app.get('/contact' , function(req, res){
  res.render("contact")
})

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
app.listen(3001);
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();
require("./app/routes/customer.routes.js")(app);
require("./app/config/db.config.js");
const connection = require("./app/models/db.js");
const path = require('path');
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

console.log(__dirname);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, '/views/pages')); 

// Set view engine as EJS
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Index Page" });
});

app.get('/home',function(req,res){
  //res.send('About Page')
  res.sendFile(__dirname+'/app/views/home.html');
});

app.get('/history/:rank',function(req,res){
  res.sendFile(__dirname+'/app/views/history.html');
});

app.get('/api',function(req,res){
  res.sendFile(__dirname+'/app/views/api.html');
});

//testing ejs folder structure below
// app.get('/home',function(req,res){
//   //res.send('About Page')
//   res.sendFile(__dirname+'./views/pages/home.ejs');
// });
var obj = {};
app.get("/coins", (req, res) => {
  connection.query('SELECT * FROM customers', function(err, result) {

            if(err){
                throw err;
            } else {
                obj = {print: result};
                res.render('/app/views/currencies', obj);                
            }});
  res.sendFile(__dirname+'/app/views/currencies.ejs');
});




var objj = {};
app.get('/coin', function(req, res){
  
    connection.query('SELECT * FROM customers', function(err, result) {

        if(err){
            throw err;
        } else {
            objj = {print: result};
            res.render('views/print', objj);                
        }
       
    });

});
//dad came
app.get("/get-all-coins", (req, res) => {
  connection.query('SELECT * FROM data where status = 1', function(err, result) {
      if(err){
          throw err;
      } else {
          res.json({ data: result });               
      }
    
  });
  
});

app.get("/get-by-rank/:rank", (req, res) => {
  var rank = req.params.rank;
  const query = "SELECT * FROM data where rank = "+rank+" order by id desc";
  connection.query(query, function(err, result) {
      if(err){
          throw err;
      } else {
          res.json({ data: result });               
      }
    
  });
  
});

// app.post('/coin',function(req, res){
//   res.sendFile(__dirname+'/app/views/print.ejs');
// });
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
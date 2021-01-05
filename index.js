const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const app = express();
const port = 8080;

// --------------------- APP HANDLERS ---------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// REST setters here
app.get('/', function (req, res) {
    res.sendFile('/public/index.html', { root: __dirname });
});

app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("Item saved to database");
    })
    .catch(err => {
      res.status(400).send("Unable to save to database. Please check logs in your OCP instance");
    });
 });



// --------------------- MONGOOSE HANDLERS ---------------------
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/redhat-node-demo", { useNewUrlParser: true, useUnifiedTopology: true });
var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
 });

 var User = mongoose.model("User", nameSchema);





// Finally create port and run server
 app.listen(port, () => {
  console.log(`RHNJS app listening at http://localhost:${port}`);
});
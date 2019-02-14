var express             = require("express");
var path                = require("path");
var cors                = require("cors");
var bodyParser          = require("body-parser");
var poll                 = require("./routes/poll");

require("./config/db");


var app = express();

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//cors
app.use(cors());

app.use("/poll", poll);


//server
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("server has started!");
});
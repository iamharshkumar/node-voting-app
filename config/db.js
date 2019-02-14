var mongoose = require("mongoose");

mongoose.connect("mongodb://harsh:harsh@ds247688.mlab.com:47688/photodiary")
.then(() => console.log("MongoDb Connected"))
.catch(err => console.log(err));
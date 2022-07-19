const mongoose = require("mongoose")
const uri = require("../.credentials/db")
const settings = require("../settings")

if (settings.useDatabase) {
    mongoose.connect(
        uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(()=>{
        console.log("Connection to database successful!")
    })
    .catch((e)=>{
        console.log("Alert: unable to connect to db!")
        console.debug(e)
    })
} else {
    console.log("Not connecting to database. Using local data!")
}



module.exports = mongoose

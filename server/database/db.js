const mongoose = require("mongoose")
const uri = require("../.credentials/db")

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

module.exports = mongoose
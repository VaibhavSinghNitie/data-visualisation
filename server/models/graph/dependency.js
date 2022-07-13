const mongoose = require("../../database/db");

dependencySchema =  mongoose.Schema({
    name: String,
    version: String,
    graph: [{
        name: {type: String, required: true},
        dependencies: [
            {
                type: String, default: null
            }
        ],
        tags: [
            {type: String}
        ],
        type: {type: String, required: true},

    }] 
})

module.exports = mongoose.model("dependency", dependencySchema)
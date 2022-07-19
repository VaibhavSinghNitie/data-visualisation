const mongoose = require("../../database/db")

dependencySchema =  new mongoose.Schema({
    name: String,
    version: String,
    graph: [{
        name: {type: String, required: true},
        dependencies: [
            {
                type: String, default: null
            }
        ],
        meta: {
            type: {type: String, required: true},
            group: {type: String, default: null},
            sourceIndex: {type: Number, default: 0},
            min: {type: Number, default: 0},
            max: {type: Number, default: null}
        },
    }]
})

module.exports = mongoose.model("dependency", dependencySchema)

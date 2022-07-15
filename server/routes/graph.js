const Dependency = require("../models/graph/dependency")
const express = require("express")
const router = express.Router()

router.get("", (req, res) => {
    res.status(200).send({
        "message": "all working ok!"
    })

})

router.get("/dependencies/:name/:version", (req, res) => {

    Dependency.findOne({name: req.params.name, version: req.params.version}).then((graph)=>{
        res.status(200).send(graph.graph);
    }).catch((e)=>{
        res.status(400).send({
            "message": "Server error"
        });
        console.log(e);
    });

})

router.get("/names", (req,res) => {
    Dependency.distinct("name").then((graphNames)=>{
        console.log(graphNames);
        res.status(200).send(graphNames);
    }).catch((e)=>{
        res.status(400).send({
            "message": "Server error"
        })
        console.log(e);
    })
})

router.get("/:name/versions", (req,res) => {
    Dependency.distinct("version", {name: req.params.name}).then((versions)=>{
        res.status(200).send(versions);
    }).catch((e)=>{
        res.status(400).send({
            "message": "Server error"
        })
        console.log(e);
    })
})

module.exports = router

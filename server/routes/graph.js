const Dependency = require("../models/graph/dependency")
const express = require("express")
const router = express.Router()

router.get("", (req, res) => {
    res.status(200).send({
        "message": "all working ok!"
    })

})

router.get("/get_dependencies/:name/:version", (req, res) => {

    Dependency.findOne({name: req.params.name, version: req.params.version}).then((graph)=>{
        res.status(200).send(graph.graph);
    }).catch((e)=>{
        res.status(400).send({
            "message": "graph not found with name: {}".format(req.params.name)
        });
        console.log(e);
    });

})

module.exports = router
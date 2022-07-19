const fs = require("fs")

const simpleGraph = JSON.parse(fs.readFileSync('../sample_data/json/graph-viz/simple-graph.json', 'utf8'));
const complexGraph = JSON.parse(fs.readFileSync('../sample_data/json/graph-viz/complex-graph.json', 'utf8'));

localCollection = JSON.stringify([simpleGraph, complexGraph])

fs.writeFile("data/local/dependencies.json", localCollection, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});

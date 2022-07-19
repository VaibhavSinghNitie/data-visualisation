const DependencyModel = require("../../models/graph/dependency")
const localCollection = require("../utils/local")

class Dependency {

    constructor(){
        this.dependencies = []
        this.graphNames = []

        // get all the dependencies
        localCollection("dependencies").forEach(d => this.dependencies.push(new DependencyModel(d)))
        // get all unique graph names
        this.dependencies.forEach(d=>this.graphNames.push(d.name))
    }

    getGraphNames = () => {
        return this.graphNames
    }

    getGraphVersion = (name) => {
        let versions = []
        this.dependencies.filter(d => d.name === name).forEach(d=>versions.push(d.version))
        return versions
    }

    getDependencies = (name, version) => {
        return this.dependencies.filter(d => (d.name === name) & (d.version === version))[0]
    }

}

const dependencies = new Dependency()

module.exports = dependencies

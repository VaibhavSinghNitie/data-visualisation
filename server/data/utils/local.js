const fs = require("fs")

const getLocalCollection = (name) => {
    const collection = JSON.parse(fs.readFileSync(`data/local/${name}.json`, 'utf8'));
    return collection
}

module.exports = getLocalCollection

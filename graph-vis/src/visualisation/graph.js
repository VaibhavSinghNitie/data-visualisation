export class Graph{


    constructor(parent, width, height, data) {

        this.parent = parent
        this.width = width
        this.height = height
        this.data = data.graph

        this.nodeColor = "rgb(0,176,240)"
        this.arcColor = "rgb(150,150,150)"
        this.radius = 20
    }

    init() {
        this.svg = d3.select(this.parent).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)

        // TODO: get dimensions in better way
        this.height = this.svg._groups[0][0].clientHeight
        this.width = this.svg._groups[0][0].clientWidth

        this.addDefs()
        this.wrangleData()
        this.generateNodes()
    };

    wrangleData() {

        let targets = {}
        this.nodes = this.data.filter(d=> d.meta.type == "node")
        this.arcs = this.data.filter(d=> d.meta.type == "arc")

        const rootNode = this.createRootNode()

        // this.addGroups() -- deprecated
        console.log(this.arcs)

        this.nodes.forEach((node)=>{
            this.arcs.forEach((arc)=>{
                if (node.dependencies.includes(arc.name)){
                    targets[arc.name] = node
                }
            })
        })

        this.arcs.forEach((arc,i) => {
            const deps = this.nodes.filter(d => d.name == arc.dependencies[arc.meta.sourceIndex])
            if (deps.length == 0){
                arc["source"] = rootNode
            } else {
                arc["source"] = deps[0]
            }
            arc["target"] = targets[arc.name]
        });


        console.log(this.arcs)

    };

    updateData() {

    }

    generateNodes() {

        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d=>d.name).distance(this.radius*5))
            .force("centre", d3.forceCenter(this.width/2, this.height/2))
            .force("charge", d3.forceManyBody())
            .force("collision", d3.forceCollide().radius(this.radius*1.50))
            .force("x", d3.forceX())
            .force("y", d3.forceY())


        this.arcElems = this.svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.arcs)
            .enter().append("line")
                .attr("class", "link")
                .attr("stroke", this.arcColor)
                .attr("stroke-width", 2)
                .attr("marker-end", "url(#arrowhead)")

        this.nodesElems = this.svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.nodes)
            .enter().append("g")
                .attr("class", "node")
                .append("circle")
                    .attr("fill", this.nodeColor)
                    .attr("r", this.radius)

        let textElems = d3.selectAll(".node").append("text")
            .data(this.nodes)
            .join("text")
                .text(function(d){return d.name})
                .attr("text-anchor", "middle")
                .attr("font-size",  this.radius / ((this.radius * 10) / 100))
                .attr("dy",  this.radius / ((this.radius * 25) / 100))
                .attr("fill", "white")

        const ticked =  () => {
            this.arcElems
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            this.nodesElems
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            textElems
                .attr("x", d=> d.x)
                .attr("y", d=> d.y)
        };

        simulation.nodes(this.nodes)
            .on("tick", ticked)

        simulation.force("link")
            .links(this.arcs)


    }

    addDefs() {

        const arrowWidth = this.radius/4
        const arrowHeight = this.radius/4
        const points = `0 0, ${arrowWidth} ${arrowHeight/2}, 0 ${arrowHeight}`

        this.svg.append("defs")
            .append("marker")
                .attr("id", "arrowhead")
                .attr("fill", this.arcColor)
                .attr("markerWidth", arrowWidth)
                .attr("markerHeight", arrowHeight)
                .attr("refX", (arrowWidth*2 + arrowHeight))
                .attr("refY", arrowHeight/2)
                .attr("orient","auto")
                .append("polygon")
                    .attr("points", points)
    }

    createRootNode() {
        let rootNode = {}
        // create if root node does not exist
        const rootNodesArr = this.nodes.filter(d => d.name==="source" & d.meta.group == "root")

        if (rootNodesArr.length == 0){
            rootNode = {
                name: "source",
                dependencies: [],
                meta: {
                    group: "root",
                    type: "node"
                }
            }
            this.nodes.push(rootNode)

        } else {
            rootNode = rootNodesArr[0]
        }

        return rootNode
    }

    endGraph() {
        d3.select("svg").remove();
    }

    addGroups() {
        this.nodes.forEach(d => {
            if (d.tags.includes("root")){
                d["group"] = 0
            } else if (d.tags.includes("stockpile")) {
                d["group"] = 1
            } else {
                d["group"] = 2
            }
        })
    }
}

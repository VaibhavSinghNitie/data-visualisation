import { Dependency } from "src/models/dependency.model";

export class Graph{

    svg: any;
    data: Dependency[];
    nodes: [];
    arcs: [];

    nodeColor: string;
    arcColor: string;

    constructor(parent:string, height:string, width:string, data: Dependency[])

    init(): void;
    wrangleData(): void;
    updateDate(): void;
    addDefs(): void;

}

export type Dependency = {
    name: string,
    version: string,
    graph: [
        name: string,
        dependencies: string[],
        meta: {
            type: string,
            group?: string,
            min?: number,
            max?: number,
            groupIndex: number
        }
    ]
}

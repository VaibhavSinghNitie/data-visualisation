import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Dependency } from "../models/dependency.model";

@Injectable()
export class DependencyService {

    public dependencies: Dependency[] = []
    public graphNames: string[] = []
    public graphVersions: string[] = []
    public selectedGraphName: string = ''
    public selectedGraphVersion: string = ''


    constructor(private http: HttpClient) {}

    // private functions
    private fetchDependencies(){
        this.http.get<Dependency[]>(`http://localhost:8080/graph/dependencies/${this.selectedGraphName}/${this.selectedGraphVersion}`).subscribe((dependencies)=>{
            this.dependencies = dependencies
            console.log(this.dependencies)
        });
    }

    private fetchGraphNames() {
        this.http.get<string[]>("http://localhost:8080/graph/names").subscribe((names)=>{
            this.graphNames = names
        });
    };

    private fetchGraphVersions() {
        this.http.get<string[]>(`http://localhost:8080/graph/${this.selectedGraphName}/versions`).subscribe((versions)=>{
            this.graphVersions = versions;
        });
    };

    // getters
    getDependencies() {
        this.fetchDependencies()
    }

    getGraphNames() {
        this.fetchGraphNames()
    }

    getGraphVersions() {
        this.fetchGraphVersions()
    }

    // setters
    setGraphName(name: string) {
        this.selectedGraphName = name
    }

    setGraphVersion(version: string) {
        this.selectedGraphVersion = version
    }
}

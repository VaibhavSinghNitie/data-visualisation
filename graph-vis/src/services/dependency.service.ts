import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

import { Dependency } from "../models/dependency.model";

@Injectable()
export class DependencyService {

    constructor(private http: HttpClient) {}

    fetchGraphNames() {
        return this.http.get<string[]>("http://localhost:8080/graph/names")
    };

    fetchGraphVersions(name: string) {
        return this.http.get<string[]>(`http://localhost:8080/graph/${name}/versions`)
    };

    fetchDependencies(name: string, version: string){
        return this.http.get<Dependency[]>(`http://localhost:8080/graph/dependencies/${name}/${version}`)
    }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DependencyService } from '../../services/dependency.service';
import { Dependency } from 'src/models/dependency.model';
import * as d3 from 'd3';
import {Graph} from '../../visualisation/graph'

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [DependencyService]
})
export class GraphComponent implements OnInit {

  private svg: any;
  private group: any;

  public dependencies: Dependency[] = []
  public graphNames: string[] = []
  public graphVersions: string[] = []
  public graphName: string = ''
  public graphVersion: string = ''

  constructor(private dependencyService: DependencyService) {}

  // private functions
  private getDependency() {
    this.dependencyService.fetchDependencies(this.graphName, this.graphVersion).subscribe((dependencies) => {
      this.dependencies = dependencies
      this.createGraph()

    })
  }

  private getGraphVersions() {
    this.dependencyService.fetchGraphVersions(this.graphName).subscribe((versions)=>{
      this.graphVersions = versions
      this.graphVersion = versions[0]
      this.getDependency()
    })
  }

  ngOnInit(): void {
    this.dependencyService.fetchGraphNames().subscribe((names)=>{
      this.graphNames = names
    });
  }

  onSelectGraphName(event: Event){
    this.graphName = (<HTMLInputElement>event.target).value
    this.getGraphVersions()
  };

  onSelectGraphVersion(event: Event){
      this.graphVersion = (<HTMLInputElement>event.target).value
      this.getDependency()
  };

  createGraph() {
    let graph = new Graph('#vis', "100%", "100%", this.dependencies)
    graph.init()
  }

}

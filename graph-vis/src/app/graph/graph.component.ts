import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DependencyService } from '../../services/dependency.service';
import { Dependency } from 'src/models/dependency.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [DependencyService]
})
export class GraphComponent implements OnInit {

  public dependencies: Dependency[] = []
  public graphNames: string[] = []
  public graphVersions: string[] = []
  public graphName: string = ''
  public graphVersion: string = ''

  constructor(private dependencyService: DependencyService) {}

  ngOnInit(): void {
    this.dependencyService.getGraphNames();
    this.graphNames = this.dependencyService.graphNames
    this.graphVersions = this.dependencyService.graphVersions
    this.graphName = this.dependencyService.selectedGraphName
    this.graphVersion = this.dependencyService.selectedGraphVersion
  }

  onSelectGraphName(event: Event){
    this.dependencyService.setGraphName((<HTMLInputElement>event.target).value)
    this.dependencyService.getGraphVersions()
  };

  onSelectGraphVersion(event: Event){
      this.dependencyService.setGraphVersion((<HTMLInputElement>event.target).value)
      this.dependencyService.getDependencies()
  };




}

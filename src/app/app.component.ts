import {Component} from '@angular/core';
import Chart from 'chart.js/auto';
import {DataService} from "./data.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public chart: any;
  public baseHref = window.location;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.createChart(data);
    })
  }

  createChart(data: any) {
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart
      data,
      options: {
        aspectRatio: 2.5
      }
    });
  }

}

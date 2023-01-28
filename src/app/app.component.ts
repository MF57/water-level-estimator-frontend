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
    this.dataService.getData("2018-10-05").subscribe(data => {
      this.createChart(data);
    })
  }

  changeDate(event: any) {
    this.dataService.getData(event.target.value).subscribe(data => {
      this.chart.data = data;
      this.chart.update();
    })
  }

  createChart(data: any) {

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data,
      options: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            labels: {
              color: 'white',
            }
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255,255,255,0.2)'
            },
            ticks: {
              color: 'white'
            }
          },
          y: {
            grid: {
              color: 'rgba(255,255,255,0.2)'
            },
            ticks: {
              color: 'white'
            }
          },
        }
      }
    });
    const gradient = this.chart.ctx.createLinearGradient(0, 0, 0, this.chart.height);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');
    data.datasets[0].backgroundColor = gradient;
    this.chart.data
  }

}

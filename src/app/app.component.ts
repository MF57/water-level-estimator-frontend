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
  invalid = false;

  datePickerValue=['2017-09-13'];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData("2017-09-13").subscribe(data => {
      this.createChart(data);
    })
  }

  changeDate(event: any) {
    const newDate = new Date(event.target.value);
    if (newDate < new Date("2012-01-01") || newDate > new Date("2021-09-30")) {
      this.invalid = true;
      return
    }
    this.invalid = false;
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
            },
            title: {
              display: true,
              text: "Data",
              color: 'white'
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255,255,255,0.2)'
            },
            ticks: {
              color: 'white',
              // stepSize: 120
            },
            title: {
              display: true,
              text: "Poziom wody [cm]",
              color: 'white'
            }
          },
        }
      }
    });

    window.addEventListener('afterprint', () => {
      this.chart.resize();
    });
    this.chart.data
  }

  setToday() {
    this.changeDate({target:{value:"2017-09-13"}})
    this.datePickerValue=['2017-09-13'];
  }

}

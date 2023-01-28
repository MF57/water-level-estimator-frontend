import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class DataService {

  constructor(private client: HttpClient) {
  }
  public getData(date: string): Observable<any> {
    let params = new HttpParams().set('date', date);

    this.client.get("https://miedz.tegess.com/dupa", {params, responseType: 'json'}).subscribe(data => {
      console.log(data);
    })


    return of({// values on X-Axis
      labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
        '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
      datasets: [
        {
          label: "Poziom Wody",
          data: ['467', '576', '572', '79', '92',
            '574', '520', '430'],
          borderColor: 'white',
          cubicInterpolationMode: 'monotone',
          pointStyle: 'circle',
          pointRadius: 10,
          pointHoverRadius: 15,
          backgroundColor: function(context: any) {
            let width, height, gradient;
            const chart = context.chart;
            const {ctx, chartArea} = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            const chartWidth = chartArea.right - chartArea.left;
            const chartHeight = chartArea.bottom - chartArea.top;
            if (!gradient || width !== chartWidth || height !== chartHeight) {
              // Create the gradient because this is either the first render
              // or the size of the chart has changed
              width = chartWidth;
              height = chartHeight;
              gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              gradient.addColorStop(0, "rgba(0,0,0,0)");
              gradient.addColorStop(1, "#f19551");
            }

            return gradient;
          },
          fill: true
        },
      ]
    })
  }
}

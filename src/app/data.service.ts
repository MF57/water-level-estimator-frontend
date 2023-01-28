import {Injectable} from "@angular/core";
import {map, Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class DataService {

  constructor(private client: HttpClient) {
  }
  public getData(date: string): Observable<any> {
    let params = new HttpParams().set('date', date);

    return this.client.get<{date: string, value: number, error: number}[]>("https://miedz.tegess.com/predict", {params, responseType: 'json'}).pipe(
      map(data => {
        return {// values on X-Axis
          labels: data.map(obj => obj.date),

          datasets: [
            {
              label: 'Minimalna niepewność',
              data: data.map(obj => obj.value - obj.error),
              borderColor: '#f19551',
              cubicInterpolationMode: 'default',
              fill: true,
            },
            {
              label: "Przewidywany poziom Wody",
              data: data.map(obj => obj.value),
              borderColor: 'white',
              cubicInterpolationMode: 'default',
              pointStyle: 'circle',
              pointRadius: 10,
              pointHoverRadius: 15,
            },
            {
              label: 'Maksymalna niepewność',
              data: data.map(obj => obj.value + obj.error),
              borderColor: '#f19551',
              cubicInterpolationMode: 'default',
              fill: "-2",
              backgroundColor: 'rgba(241,149,81,0.56)',
            },
          ]
        }
      })
    )
  }
}

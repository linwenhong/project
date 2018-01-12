import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export abstract class ServiceBaseService<T> {

  API_URL: string = environment.api_url;

  constructor(
    private http: Http
  ) { }

  protected abstract getApiUrl(): string;

  getAll(): Promise<any> {
    const test = {
      api_url: this.API_URL,
      path: this.getApiUrl()
    };
    console.log(test);
    return this.http.get('123')
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch( () => alert(1));
  }
}

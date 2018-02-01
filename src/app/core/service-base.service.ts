import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export abstract class ServiceBaseService<T> {

  API_URL: string = environment.api_url;
  api_url: string;

  constructor(
    private http: Http
  ) {
    this.api_url = this.API_URL;
    console.log(this.api_url);
  }

  // protected abstract getApiUrl(): string;

  get(url: string): Promise<any> {
    return this.http.get(this.api_url + url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch( () => muiToast('responseError'));
  }

  put(url: string): Promise<any> {
    return this.http.get(this.api_url + url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch( () => muiToast('responseError'));
  }

  post(request: object): Promise<any> {
    return this.http.post(this.api_url, request)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch( () => muiToast('responseError'));
  }
}

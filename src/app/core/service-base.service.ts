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
    this.api_url = this.API_URL + this.getApiUrl();
    console.log(this.api_url);
  }

  protected abstract getApiUrl(): string;

  getAll(): Promise<any> {

    return this.http.get(this.api_url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch( () => alert(1));
  }
}

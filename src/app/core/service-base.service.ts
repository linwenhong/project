import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Http, Headers} from '@angular/http';

@Injectable()
export abstract class ServiceBaseService<T> {

  API_URL: string = environment.api_url;
  api_url: string;
  header: Headers;

  constructor(
    private http: Http
  ) {
    this.api_url = this.API_URL;
    const header: Headers = new Headers();
    header.append('Authorization', localStorage.getItem('token'));
    this.header = header;
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

  put(url: string, data: any): Promise<any> {
    return this.http.put(this.api_url + url, data, { headers: this.header })
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

  getCodeUserId(): number {
    return JSON.parse(localStorage.getItem('user')).id;
  }
}

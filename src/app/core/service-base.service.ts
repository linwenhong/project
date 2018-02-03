import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Http, Headers} from '@angular/http';

@Injectable()
export abstract class ServiceBaseService<T> {

  API_URL: string = environment.api_url;
  api_url: string;

  constructor(
    private http: Http
  ) {
    this.api_url = this.API_URL;

  }

  private getHeader(): Headers {
    const header: Headers = new Headers();
    header.append('Authorization', localStorage.getItem('token'));
    return header;
  }

  // protected abstract getApiUrl(): string;

  get(url: string): Promise<any> {
    return this.http.get(this.api_url + url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => this.responseError(error.json()));
  }

  put(url: string, request: any): Promise<T> {
    return this.http.put(this.api_url + url, request, { headers: this.getHeader() })
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => this.responseError(error.json()));
  }

  post(url: string, request: any): Promise<any> {
    return this.http.post(this.api_url + url, request, { headers: this.getHeader() })
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => this.responseError(error.json()));
  }

  getCodeUserId(): number {
    return JSON.parse(localStorage.getItem('user')).id;
  }

  responseError(error): void {
    muiToast(error.error);
  }
}

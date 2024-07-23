import { Injectable } from '@angular/core';
import { Constants } from './app-routing.module'; // Ensure this path is correct
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = this.getBaseUrl();
  }

  getBaseUrl(): string {
    const selectedTenant = localStorage.getItem(Constants.SELECTED_TENANT);
    if (selectedTenant) {
      return selectedTenant;
    }
    return Constants.apiEndpoint;
  }

  useLocalServer(): void {
    this.baseUrl = Constants.apiEndpoint_local;
    localStorage.setItem(Constants.RUN_SERVER, 'local');
  }

  useLiveServer(): void {
    this.baseUrl = Constants.apiEndpoint;
    localStorage.setItem(Constants.RUN_SERVER, 'live');
  }

 

  getResponse(method: string, endpoint: string, content_type: string, postParams: { mobilenumber: String | undefined; }): Observable<any> {

    if (localStorage.getItem(Constants.SELECTED_TENANT)) {
      this.baseUrl = localStorage.getItem(Constants.SELECTED_TENANT) || "";
      console.log('---------this.baseUrl---' + this.baseUrl);
    }

    let headers = new HttpHeaders();
    if (localStorage.getItem(Constants.ACCESS_TOKEN)) {
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem(Constants.ACCESS_TOKEN)}`);
    }
    headers = headers.append('Content-Type', content_type);

    if (!this.baseUrl) {
      this.baseUrl = Constants.apiEndpoint;
    }

    const url = `${this.baseUrl + endpoint}`;
    const response = this.http.request(method, url, { body: postParams, headers: headers, withCredentials: true });
    return response;

  }

  get currentBaseUrl(): string {
    return this.baseUrl;
  }
}

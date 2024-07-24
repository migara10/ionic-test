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

   // checking json is valid or not
   IsJsonString(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
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

 

  getResponse(method: string, endpoint: string, content_type: string, postParams: any): Observable<any> {

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

  setPrimaryColor(colors: any) {
    if (this.IsJsonString(colors)) {
      colors = JSON.parse(colors);
    }

    document.documentElement.style.setProperty('--ion-color-primary', colors.color_8);

    document.documentElement.style.setProperty('--ion-theme-color-1', colors.color_1);
    document.documentElement.style.setProperty('--ion-theme-color-2', colors.color_2);
    document.documentElement.style.setProperty('--ion-theme-color-3', colors.color_3);
    document.documentElement.style.setProperty('--ion-theme-color-4', colors.color_4);
    document.documentElement.style.setProperty('--ion-theme-color-5', colors.color_5);
    document.documentElement.style.setProperty('--ion-theme-color-6', colors.color_6);
    document.documentElement.style.setProperty('--ion-theme-color-7', colors.color_7);
    document.documentElement.style.setProperty('--ion-theme-color-8', colors.color_8);

    // this.statusBar.backgroundColorByHexString(colors.color_1);

    if (!this.IsJsonString(colors)) {
      localStorage.setItem(Constants.PRIMARY_COLOR, JSON.stringify(colors));
    }
  }


  get currentBaseUrl(): string {
    return this.baseUrl;
  }
}

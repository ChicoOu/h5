import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient: HttpClient) { }

  getLeds() {
    return this.httpClient.get(environment.url_base + 'led');
  }

  changeLed(id: string, status: number) {
    return this.httpClient.post(environment.url_base + 'led/' + id + '/' + status, {});
  }
}

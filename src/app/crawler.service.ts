import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CrawlerService {
  private bbcUrl = '/api/';
  constructor(private http: HttpClient) {}
  fetchPage(): Observable<string> {
    return this.http.get(this.bbcUrl, { responseType: 'text' });
  }
}

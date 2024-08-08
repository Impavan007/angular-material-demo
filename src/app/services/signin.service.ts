import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'https://your-api-url.com/register'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://10.26.32.98:4200/api/auth/home'; 

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    const token = localStorage.getItem('sessionToken');
    if (!token) {
      throw new Error('No session token found');
    }

    // Set headers including the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(headers)

    // If the API requires a POST request, adjust accordingly
    return this.http.post<any>(this.apiUrl, {}, { headers });
  }
}

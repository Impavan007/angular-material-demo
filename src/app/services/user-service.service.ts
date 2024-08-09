import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://10.26.32.98:4200/api/auth/home'; 

  private userData: any;  // Variable to store user data

  constructor(private http: HttpClient) {}

  getUserData(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email });
  }

  setUserData(data: any): void {
    this.userData = data;
  }

  getUserDataFromCache(): any {
    return this.userData;
  }
}

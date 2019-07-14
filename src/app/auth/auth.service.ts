import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

// const loginUrl = 'http://localhost:3000/api/auth/login';
const loginUrl = 'http://192.168.1.162:3000/api/auth/login';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(loginUrl, {username, password}, this.httpOptions)
      .pipe(
        tap(response => localStorage.setItem('token', response.token))
      );
  }
}

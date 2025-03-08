import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { NewUser } from '../../shared/models/new-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/api/auth';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(tap((response) => this.setToken(response.token)));
  }

  signup(user: NewUser) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout() {
    this.clearToken();
    this.authStatus.next(false);
  }

  isLoggedIn() {
    return this.authStatus.asObservable();
  }

  // TODO: Later, replace localStorage with Http Only cookies
  getToken(): string | null {
    return this.retrieveToken();
  }

  private setToken(token: string) {
    this.storeToken(token);
    this.authStatus.next(true);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private clearToken() {
    localStorage.removeItem('token');
  }

  private storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  private retrieveToken(): string | null {
    return localStorage.getItem('token');
  }
}

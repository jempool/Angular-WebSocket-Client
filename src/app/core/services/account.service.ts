import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  signup(user: any) {
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, user)
    .pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  refreshToken(user: any) {
    return this.http.post<User>(`${environment.apiUrl}/auth/refresh`, user)
    .pipe(
      map((user) => {
        this.userSubject.next(user);
        return user;
      })
    );
  }
}

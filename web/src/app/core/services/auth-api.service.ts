import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>

  constructor(private http: HttpClient, private sessionService: SessionService) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(
      `${environment.api}/login`,
      {email, password}
    ).pipe(map((user) => {
      if(user){
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.sessionService.updateAbility(user["access_token"]);
      }
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.sessionService.clearSession();
  }
}

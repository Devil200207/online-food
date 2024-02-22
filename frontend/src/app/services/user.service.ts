import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USERS_LOGIN_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(new User());
  public userObserable:Observable<User>;

  constructor(private http:HttpClient)
  {
    this.userObserable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>
  {
    return this.http.post<User>(USERS_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user:User) => {
          this.userSubject.next(user);
        },
        error:(errorresponce) => {
          this.userSubject.next(new User());
        }

      })
    );
  }
}

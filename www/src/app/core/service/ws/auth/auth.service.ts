import { User } from '@/app/core/models/user.model';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;
  endpoint = environment.endpoint;


  constructor(private httpClient: HttpClient) {
    const currentUser = localStorage.getItem('currentUser') || 'null';
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(currentUser)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public setCurrentUserValue(currentUser: User) {
    this.currentUserSubject.next(currentUser);
  }

  isAuthenticated(){
    return (localStorage.getItem('access_token')===null || localStorage.getItem('access_token')===undefined || localStorage.getItem('access_token')==='undefined')?false:true;
  }
  getUserByToken() {
    const body = {
      access_token : JSON.parse(localStorage.getItem('access_token') || 'null')
    }
    return this.httpClient.post(this.endpoint + '/auth/get', body);
  }

  login(login: any) {
    return this.httpClient.post(this.endpoint + '/login', login).pipe(
      map((loginResponse: any) => {
        localStorage.setItem(
          'access_token',
          JSON.stringify(loginResponse.access_token)
        );
        localStorage.setItem(
          'token_type',
          JSON.stringify(loginResponse.token_type)
        );
      })
    );
  }

  register(register: any) {
    return this.httpClient.post(this.endpoint + '/register', register).pipe(
      map((loginResponse: any) => {
        localStorage.setItem(
          'access_token',
          JSON.stringify(loginResponse.access_token)
        );
        localStorage.setItem(
          'token_type',
          JSON.stringify(loginResponse.token_type)
        );
      })
    );
  }

  submitForgotPassword(emailToForgotPassword: any){
    return this.httpClient.post(this.endpoint + '/forgot-password', emailToForgotPassword);
  }

  update(update: any) {
    return this.httpClient.post(this.endpoint + '/auth/update', update);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    //this.currentUserSubject.next();
  }

  updateConfig(update: any) {
    console.log(update);
    return this.httpClient.post(this.endpoint + '/configuration/update', update);
  }

  initConfig(){
    return this.httpClient.get(this.endpoint + '/configuration');

  }

  resetPassword(token:string,password:string){
    const body = {
      token:token,
      password:password
    }
    return this.httpClient.put(this.endpoint + '/reset-password', body);
  }
}

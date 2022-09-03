import {Injectable} from '@angular/core';
import {Service} from "./service.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {RegisterUserRequest} from "../models/auth/register-user-request";
import {catchError, map, Observable, of} from "rxjs";
import {Globals} from "../shared/globals";
import {RegisterUserResponse} from "../models/auth/register-user-response";
import {User} from "../models/auth/user";
import {LoginUserRequest} from "../models/auth/login-user-request";
import {RegisterMechanicRequest} from "../models/auth/register-mechanic-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service {

  constructor(private http: HttpClient, protected override toastr: ToastrService, protected override spinner: NgxSpinnerService) {
    super(toastr, spinner);
  }

  register(data: RegisterUserRequest): Observable<RegisterUserResponse | string> {
    this.logout();
    this.spinner.show();
    return this.http.post<RegisterUserResponse>(Globals.apiUrl + "register", data).pipe(
      map(result => {
        this.setUser(result.user, result.token);
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  registerMechanic(data: RegisterMechanicRequest): Observable<boolean | string> {
    this.logout();
    this.spinner.show();
    return this.http.post(Globals.apiUrl + "register_mechanic", data).pipe(
      map(() => {
        this.spinner.hide();
        return of(true);
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  login(data: LoginUserRequest): Observable<RegisterUserResponse | string> {
    this.logout();
    this.spinner.show();
    return this.http.post<RegisterUserResponse>(Globals.apiUrl + "login", data).pipe(
      map(result => {
        this.setUser(result.user, result.token);
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  setUser(user: User, token: string) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }

  getUser(): User | null {

    if (localStorage.getItem("user") !== null) {
      return JSON.parse(localStorage.getItem("user")!);
    }
    return null;
  }

  isLoggedIn() {
    return this.getUser() !== null;
  }

  logout() {
    localStorage.removeItem("user");
    this.http.get(Globals.apiUrl + "logout").pipe(
      map(result => {
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  isOwner():boolean{
    let user = this.getUser();
    if(user === null) return false;

    return user.roles.filter(r => r.name === "OWNER").length !== 0;
  }

  isAdmin():boolean{
    let user = this.getUser();
    if(user === null) return false;

    return user.roles.filter(r => r.name === "ADMIN").length !== 0;
  }

  isMechanic():boolean{
    let user = this.getUser();
    if(user === null) return false;

    return user.roles.filter(r => r.name === "MECHANIC").length !== 0;
  }

}

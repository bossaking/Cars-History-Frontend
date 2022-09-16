import { Injectable } from '@angular/core';
import {Service} from "./service.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {catchError, map, Observable} from "rxjs";
import {User} from "../models/auth/user";
import {RequestsCountResponse} from "../models/users/requests-count-response";
import {SingleManufacturerResponse} from "../models/manufacturers/single-manufacturer-response";
import {Globals} from "../shared/globals";
import {RegistrationRequestsResponse} from "../models/users/registration-requests-response";
import {RequestDecision} from "../models/users/request-decision";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends Service {

  constructor(private http: HttpClient, protected override toastr: ToastrService, protected override spinner: NgxSpinnerService) {
    super(toastr, spinner);
  }


  requestsCount() : Observable<RequestsCountResponse>{
    this.spinner.show();
    return this.http.get<RequestsCountResponse>(Globals.apiUrl + 'not_available_users_count').pipe(
      map(result => {
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  registrationRequests() : Observable<RegistrationRequestsResponse>{
    this.spinner.show();
    return this.http.get<RegistrationRequestsResponse>(Globals.apiUrl + 'not_available_users').pipe(
      map(result => {
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  registrationRequestsDecision(decision:RequestDecision) : Observable<string>{
    this.spinner.show();
    return this.http.post<string>(Globals.apiUrl + 'user_account_decision', decision).pipe(
      map(result => {
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
}

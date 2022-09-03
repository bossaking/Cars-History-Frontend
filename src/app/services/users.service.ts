import { Injectable } from '@angular/core';
import {Service} from "./service.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {Observable} from "rxjs";
import {User} from "../models/auth/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends Service {

  constructor(private http: HttpClient, protected override toastr: ToastrService, protected override spinner: NgxSpinnerService) {
    super(toastr, spinner);
  }

}

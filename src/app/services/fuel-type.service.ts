import { Injectable } from '@angular/core';
import {Service} from "./service.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {FuelType} from "../models/fuel-types/fuel-type";
import {catchError, map, Observable} from "rxjs";
import {Globals} from "../shared/globals";
import {FuelTypesResponse} from "../models/fuel-types/fuel-types-response";

@Injectable({
  providedIn: 'root'
})
export class FuelTypeService extends Service {

  constructor(private http: HttpClient, protected override toastr: ToastrService, protected override spinner: NgxSpinnerService) {
    super(toastr, spinner);
  }

  getAll() : Observable<FuelTypesResponse>{
    this.spinner.show();
    return this.http.get<FuelTypesResponse>(Globals.apiUrl + 'fuel_types/all').pipe(
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

import { Injectable } from '@angular/core';
import {Service} from "./service.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {FuelType} from "../models/fuel-types/fuel-type";
import {catchError, map, Observable} from "rxjs";
import {Globals} from "../shared/globals";
import {FuelTypesResponse} from "../models/fuel-types/fuel-types-response";
import {NewFuelTypeRequest} from "../models/fuel-types/new-fuel-type-request";
import {DeleteFuelTypeRequest} from "../models/fuel-types/delete-fuel-type-request";

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

  create(data:NewFuelTypeRequest) : Observable<boolean | string>{
    this.spinner.show();
    return this.http.post<NewFuelTypeRequest>(Globals.apiUrl + 'fuel_types/new', data).pipe(
      map(result => {
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  update(data:FuelType) : Observable<string | boolean>{
    this.spinner.show();
    return this.http.put<FuelType>(Globals.apiUrl + 'fuel_types/edit', data).pipe(
      map(result => {
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  delete(data:DeleteFuelTypeRequest) : Observable<null | boolean>{
    this.spinner.show();
    return this.http.delete<DeleteFuelTypeRequest>(Globals.apiUrl + 'fuel_types/delete', {body:data}).pipe(
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

import { Injectable } from '@angular/core';
import {Service} from "./service.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {catchError, map, Observable} from "rxjs";
import {FuelTypesResponse} from "../models/fuel-types/fuel-types-response";
import {Globals} from "../shared/globals";
import {ManufacturersResponse} from "../models/manufacturers/manufacturers-response";
import {NewFuelTypeRequest} from "../models/fuel-types/new-fuel-type-request";
import {NewManufacturerRequest} from "../models/manufacturers/new-manufacturer-request";
import {DeleteFuelTypeRequest} from "../models/fuel-types/delete-fuel-type-request";
import {Manufacturer} from "../models/manufacturers/manufacturer";
import {SingleManufacturerResponse} from "../models/manufacturers/single-manufacturer-response";
import {CarModel} from "../models/car-models/car-model";

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService extends Service {

  constructor(private http: HttpClient, protected override toastr: ToastrService, protected override spinner: NgxSpinnerService) {
    super(toastr, spinner);
  }

  getAll() : Observable<ManufacturersResponse>{
    this.spinner.show();
    return this.http.get<ManufacturersResponse>(Globals.apiUrl + 'manufacturers/all').pipe(
      map(result => {
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  getById(id:number) : Observable<SingleManufacturerResponse>{
    this.spinner.show();
    let params = new HttpParams().append('id', id);
    return this.http.get<SingleManufacturerResponse>(Globals.apiUrl + 'manufacturers/models', {params}).pipe(
      map(result => {
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  create(data:NewManufacturerRequest) : Observable<boolean | string>{
    this.spinner.show();
    return this.http.post<NewManufacturerRequest>(Globals.apiUrl + 'manufacturers/new', data).pipe(
      map(result => {
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }


  update(data:Manufacturer) : Observable<string | boolean>{
    this.spinner.show();
    return this.http.put<Manufacturer>(Globals.apiUrl + 'manufacturers/edit', data).pipe(
      map(result => {
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  delete(data:any) : Observable<null | boolean>{
    this.spinner.show();
    return this.http.delete(Globals.apiUrl + 'manufacturers/delete', {body:data}).pipe(
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

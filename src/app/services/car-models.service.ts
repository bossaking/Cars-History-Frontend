import { Injectable } from '@angular/core';
import {Service} from "./service.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {NewManufacturerRequest} from "../models/manufacturers/new-manufacturer-request";
import {catchError, map, Observable} from "rxjs";
import {Globals} from "../shared/globals";
import {NewCarModelRequest} from "../models/car-models/new-car-model-request";
import {FuelType} from "../models/fuel-types/fuel-type";
import {CarModel} from "../models/car-models/car-model";

@Injectable({
  providedIn: 'root'
})
export class CarModelsService extends Service {

  constructor(private http: HttpClient, protected override toastr: ToastrService, protected override spinner: NgxSpinnerService) {
    super(toastr, spinner);
  }

  create(data:NewCarModelRequest) : Observable<boolean | string>{
    this.spinner.show();
    return this.http.post<NewCarModelRequest>(Globals.apiUrl + 'models/new', data).pipe(
      map(result => {
        this.spinner.hide();
        return result;
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  update(data:CarModel) : Observable<string | boolean>{
    this.spinner.show();
    return this.http.put<CarModel>(Globals.apiUrl + 'models/edit', data).pipe(
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
    return this.http.delete(Globals.apiUrl + 'models/delete', {body:data}).pipe(
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

import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})

export class Service{
  constructor(protected toastr: ToastrService, protected spinner: NgxSpinnerService) {
  }

  showError(err: string){
    this.spinner.hide();
    this.toastr.error(err, 'Błąd :(');
  }

  showSuccess(msg: string){
    this.spinner.hide();
    this.toastr.success(msg, 'Udało się :)');
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.status === 0 || error.status === 500) {
      console.error('An error occurred:', error.error);
      this.showError(error.error);
    } else {
      this.showError(error.error.message);
      return of(error.error.message);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

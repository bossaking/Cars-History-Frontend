import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {matchPasswordsValidator} from "../shared/match-password.directive";
import {Globals} from "../shared/globals";
import {FuelTypeService} from "../services/fuel-type.service";
import {NewFuelTypeRequest} from "../models/fuel-types/new-fuel-type-request";

@Component({
  selector: 'app-new-fuel-type-dialog',
  templateUrl: './new-fuel-type-dialog.component.html',
  styleUrls: ['./new-fuel-type-dialog.component.scss']
})
export class NewFuelTypeDialogComponent implements OnInit {

  newFuelTypeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<NewFuelTypeDialogComponent>, private fuelTypesService: FuelTypeService) {
  }

  ngOnInit(): void {
  }

  getRequiredErrorMessage() {
    return Globals.required;
  }

  getTakenNameError() {
    return Globals.takenFieldError;
  }


  addNewFuelType() {

    if (this.newFuelTypeForm.invalid) {
      return;
    }

    const data: NewFuelTypeRequest = {
      name: this.newFuelTypeForm.controls['name'].value!
    };

    this.fuelTypesService.create(data).subscribe(result => {

      if (result === "The name has already been taken.") {
        this.newFuelTypeForm.controls['name'].setErrors({'taken': true});
        return;
      }

      this.dialogRef.close();

    });

  }

}

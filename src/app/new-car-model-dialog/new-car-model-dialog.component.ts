import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FuelTypeService} from "../services/fuel-type.service";
import {Globals} from "../shared/globals";
import {NewFuelTypeRequest} from "../models/fuel-types/new-fuel-type-request";
import {CarModelsService} from "../services/car-models.service";
import {NewCarModelRequest} from "../models/car-models/new-car-model-request";

@Component({
  selector: 'app-new-car-model-dialog',
  templateUrl: './new-car-model-dialog.component.html',
  styleUrls: ['./new-car-model-dialog.component.scss']
})
export class NewCarModelDialogComponent implements OnInit {

  newCarModelForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<NewCarModelDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private carModelsService: CarModelsService) {
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

    if (this.newCarModelForm.invalid) {
      return;
    }

    const data: NewCarModelRequest = {
      car_manufacturer_id : this.data['id'],
      name: this.newCarModelForm.controls['name'].value!
    };

    this.carModelsService.create(data).subscribe(result => {

      if (result === "Model already exist") {
        this.newCarModelForm.controls['name'].setErrors({'taken': true});
        return;
      }

      this.dialogRef.close();

    });

  }

}

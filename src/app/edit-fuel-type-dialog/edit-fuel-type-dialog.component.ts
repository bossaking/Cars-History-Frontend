import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Globals} from "../shared/globals";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FuelType} from "../models/fuel-types/fuel-type";
import {FuelTypeService} from "../services/fuel-type.service";

@Component({
  selector: 'app-edit-fuel-type-dialog',
  templateUrl: './edit-fuel-type-dialog.component.html',
  styleUrls: ['./edit-fuel-type-dialog.component.scss']
})
export class EditFuelTypeDialogComponent implements OnInit {

  fuelTypeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });


  constructor(private dialogRef: MatDialogRef<EditFuelTypeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fuelTypeService : FuelTypeService) { }

  ngOnInit(): void {
    this.fuelTypeForm.controls.name.setValue(this.data.name);
  }

  getRequiredErrorMessage() {
    return Globals.required;
  }

  getTakenNameError() {
    return Globals.takenFieldError;
  }

  save(){

    if(this.fuelTypeForm.invalid){
      return;
    }

    const fuelType : FuelType = {
      id: this.data.id,
      name: this.fuelTypeForm.controls.name.value!
    };

    this.fuelTypeService.update(fuelType).subscribe(result => {
      if (result === "The name has already been taken.") {
        this.fuelTypeForm.controls['name'].setErrors({'taken': true});
        return;
      }

      this.dialogRef.close();
    });

  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FuelTypeService} from "../services/fuel-type.service";
import {Globals} from "../shared/globals";
import {FuelType} from "../models/fuel-types/fuel-type";
import {CarModelsService} from "../services/car-models.service";
import {CarModel} from "../models/car-models/car-model";

@Component({
  selector: 'app-edit-car-model-dialog',
  templateUrl: './edit-car-model-dialog.component.html',
  styleUrls: ['./edit-car-model-dialog.component.scss']
})
export class EditCarModelDialogComponent implements OnInit {

  carModelForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });


  constructor(private dialogRef: MatDialogRef<EditCarModelDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private carModelsService : CarModelsService) { }

  ngOnInit(): void {
    this.carModelForm.controls.name.setValue(this.data.name);
  }

  getRequiredErrorMessage() {
    return Globals.required;
  }

  getTakenNameError() {
    return Globals.takenFieldError;
  }

  save(){

    if(this.carModelForm.invalid){
      return;
    }

    const data : CarModel = {
      id: this.data.id,
      name: this.carModelForm.controls.name.value!,
      carManufacturerId : this.data.carManufacturerId
    };

    this.carModelsService.update(data).subscribe(result => {
      if (result === "Model with same name already exist") {
        this.carModelForm.controls['name'].setErrors({'taken': true});
        return;
      }

      const model = {
        name: this.carModelForm.controls.name.value,
        id: this.data.id
      };

      this.dialogRef.close(model);
    });

  }

}

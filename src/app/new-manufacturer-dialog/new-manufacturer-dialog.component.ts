import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {FuelTypeService} from "../services/fuel-type.service";
import {Globals} from "../shared/globals";
import {NewManufacturerRequest} from "../models/manufacturers/new-manufacturer-request";
import {ManufacturersService} from "../services/manufacturers.service";

@Component({
  selector: 'app-new-manufacturer-dialog',
  templateUrl: './new-manufacturer-dialog.component.html',
  styleUrls: ['./new-manufacturer-dialog.component.scss']
})
export class NewManufacturerDialogComponent implements OnInit {

  newManufacturerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<NewManufacturerDialogComponent>, private manufacturersService: ManufacturersService) {
  }

  ngOnInit(): void {
  }

  getRequiredErrorMessage() {
    return Globals.required;
  }

  getTakenNameError() {
    return Globals.takenFieldError;
  }


  addNewManufacturer() {

    if (this.newManufacturerForm.invalid) {
      return;
    }

    const data: NewManufacturerRequest = {
      name: this.newManufacturerForm.controls.name.value!
    };

    this.manufacturersService.create(data).subscribe(result => {

      if (result === "The name has already been taken.") {
        this.newManufacturerForm.controls.name.setErrors({'taken': true});
        return;
      }

      this.dialogRef.close();

    });

  }

}

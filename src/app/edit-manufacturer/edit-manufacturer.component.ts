import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Manufacturer} from "../models/manufacturers/manufacturer";
import {ManufacturersService} from "../services/manufacturers.service";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {matchPasswordsValidator} from "../shared/match-password.directive";
import {Globals} from "../shared/globals";
import {NewManufacturerDialogComponent} from "../new-manufacturer-dialog/new-manufacturer-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NewCarModelDialogComponent} from "../new-car-model-dialog/new-car-model-dialog.component";

@Component({
  selector: 'app-edit-manufacturer',
  templateUrl: './edit-manufacturer.component.html',
  styleUrls: ['./edit-manufacturer.component.scss']
})
export class EditManufacturerComponent implements OnInit {

  @ViewChild('carName') carNameInput: ElementRef | undefined;

  carNameForm = new FormGroup({
    name: new FormControl({value: '', disabled: true}, [Validators.required]),
  });

  id: number | null = null;

  manufacturer:Manufacturer | null = null;

  editMode:boolean = false;
  oldValue:string | null = null;

  constructor(private route: ActivatedRoute, private manufacturersService:ManufacturersService, private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if(this.id === null) return;

      this.getAll();

    });
  }

  getAll(){
    this.manufacturersService.getById(this.id!).subscribe(result => {
      this.manufacturer = result.manufacturer;

      this.carNameForm.controls.name.setValue(this.manufacturer.name);

    });
  }

  switchEditMode(){
    this.editMode = !this.editMode;
    this.editMode ? this.carNameForm.controls.name.enable() : this.carNameForm.controls.name.disable();
    this.editMode ? this.oldValue = this.carNameForm.controls.name.value : this.carNameForm.controls.name.setValue(this.oldValue);
  }

  saveNameChanges(){

    if(this.carNameForm.controls.name.invalid) return;

    this.manufacturer!.name = this.carNameForm.controls.name.value!;

    this.manufacturersService.update(this.manufacturer!).subscribe(result => {
      if (result === "The name has already been taken.") {
        this.carNameForm.controls['name'].setErrors({'taken': true});
        return;
      }

      this.oldValue = this.carNameForm.controls.name.value!;
      this.switchEditMode();

    });

  }


  getRequiredErrorMessage() {
    return Globals.required;
  }

  getTakenNameError() {
    return Globals.takenFieldError;
  }

  newModel(){
    const dialog = this.dialog.open(NewCarModelDialogComponent, {data:{id: this.id}});
    dialog.afterClosed().subscribe(result => {
      if(result !== false){
        this.getAll();
      }
    });
  }

  carModelDeleted(id:any){
    this.manufacturer?.carModels.splice( this.manufacturer?.carModels.indexOf(this.manufacturer?.carModels.find(cm => cm.id === id)!) ,1);
  }

  carModelUpdated(data:any){
    this.manufacturer!.carModels[this.manufacturer!.carModels.indexOf(this.manufacturer?.carModels.find(cm => cm.id === data.id)!)].name = data.name;
  }
}

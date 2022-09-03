import { Component, OnInit } from '@angular/core';
import {FuelTypeService} from "../services/fuel-type.service";
import {FuelType} from "../models/fuel-types/fuel-type";
import {MatDialog} from "@angular/material/dialog";
import {NewFuelTypeDialogComponent} from "../new-fuel-type-dialog/new-fuel-type-dialog.component";
import {ConfirmDeleteDialogComponent} from "../confirm-delete-dialog/confirm-delete-dialog.component";
import {DeleteFuelTypeRequest} from "../models/fuel-types/delete-fuel-type-request";
import {EditFuelTypeDialogComponent} from "../edit-fuel-type-dialog/edit-fuel-type-dialog.component";

@Component({
  selector: 'app-fuel-types',
  templateUrl: './fuel-types.component.html',
  styleUrls: ['./fuel-types.component.scss']
})
export class FuelTypesComponent implements OnInit {

  fuelTypes:FuelType[] = [];

  constructor(private fuelTypesService : FuelTypeService, public dialog: MatDialog) {
    this.getFuelTypes();
  }

  getFuelTypes(){
    this.fuelTypesService.getAll().subscribe(result => {
      this.fuelTypes = result.fuelTypes;
    });
  }

  ngOnInit(): void {
  }

  newFuelType(){
    const dialog = this.dialog.open(NewFuelTypeDialogComponent);
    dialog.afterClosed().subscribe(result => {
      if(result !== false){
        this.getFuelTypes();
      }
    });
  }

  editFuelType(fuelType : FuelType){
    const dialog = this.dialog.open(EditFuelTypeDialogComponent, {data:{name: fuelType.name, id: fuelType.id}});
    dialog.afterClosed().subscribe(result => {
      if(result !== false){
        this.getFuelTypes();
      }
    });
  }

  removeFuelType(id:number){
    const dialog = this.dialog.open(ConfirmDeleteDialogComponent);
    dialog.afterClosed().subscribe(result => {

      if(result){

        const data : DeleteFuelTypeRequest = {
          id : id
        };

        this.fuelTypesService.delete(data).subscribe(result => {
          if(result){
           this.getFuelTypes();
          }
        });
      }

    });
  }

}

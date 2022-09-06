import { Component, OnInit } from '@angular/core';
import {Manufacturer} from "../models/manufacturers/manufacturer";
import {ManufacturersService} from "../services/manufacturers.service";
import {NewFuelTypeDialogComponent} from "../new-fuel-type-dialog/new-fuel-type-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NewManufacturerDialogComponent} from "../new-manufacturer-dialog/new-manufacturer-dialog.component";
import {ConfirmDeleteDialogComponent} from "../confirm-delete-dialog/confirm-delete-dialog.component";
import {DeleteFuelTypeRequest} from "../models/fuel-types/delete-fuel-type-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss']
})
export class ManufacturersComponent implements OnInit {

  manufacturers : Manufacturer[] = [];

  constructor(private manufacturersService : ManufacturersService, public dialog: MatDialog, private router:Router) { }

  getAll(){
    this.manufacturersService.getAll().subscribe(result => {
      this.manufacturers = result.carManufacturers;
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  newManufacturer(){
    const dialog = this.dialog.open(NewManufacturerDialogComponent);
    dialog.afterClosed().subscribe(result => {
      if(result !== false){
        this.getAll();
      }
    });
  }

  editManufacturer(id:number){

  }

  removeManufacturer(id:number){
    const dialog = this.dialog.open(ConfirmDeleteDialogComponent);
    dialog.afterClosed().subscribe(result => {

      if(result){

        const data = {
          id : id
        };

        this.manufacturersService.delete(data).subscribe(result => {
          if(result){
            this.getAll();
          }
        });
      }

    });
  }

  showMore(id:number){
    this.router.navigate(['/admin/manufacturers/' + id]);
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarModel} from "../models/car-models/car-model";
import {CarModelsService} from "../services/car-models.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteDialogComponent} from "../confirm-delete-dialog/confirm-delete-dialog.component";
import {EditFuelTypeDialogComponent} from "../edit-fuel-type-dialog/edit-fuel-type-dialog.component";
import {EditCarModelDialogComponent} from "../edit-car-model-dialog/edit-car-model-dialog.component";

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss']
})
export class CarModelComponent implements OnInit {

  @Input() model : CarModel | null = null;

  @Output() deleted = new EventEmitter();
  @Output() updated = new EventEmitter();

  constructor(private carModelsService:CarModelsService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  edit(){
    const dialog = this.dialog.open(EditCarModelDialogComponent, {data:{name: this.model?.name, id: this.model?.id, carManufacturerId:this.model?.carManufacturerId}});
    dialog.afterClosed().subscribe(result => {
      this.updated.emit(result);
    });
  }

  remove(){

    const dialog = this.dialog.open(ConfirmDeleteDialogComponent);
    dialog.afterClosed().subscribe(result => {

      if(result){

        const data = {
          id : this.model?.id
        };

        this.carModelsService.delete(data).subscribe(result => {
          if(result){
            this.deleted.emit(this.model?.id);
          }
        });
      }

    });

  }

}

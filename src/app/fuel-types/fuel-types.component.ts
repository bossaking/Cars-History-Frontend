import { Component, OnInit } from '@angular/core';
import {FuelTypeService} from "../services/fuel-type.service";
import {FuelType} from "../models/fuel-types/fuel-type";

@Component({
  selector: 'app-fuel-types',
  templateUrl: './fuel-types.component.html',
  styleUrls: ['./fuel-types.component.scss']
})
export class FuelTypesComponent implements OnInit {

  fuelTypes:FuelType[] = [];

  constructor(private fuelTypesService : FuelTypeService) {
    fuelTypesService.getAll().subscribe(result => {
      this.fuelTypes = result.fuelTypes;
      console.log(this.fuelTypes[0].name);
    });
  }

  ngOnInit(): void {
  }

}

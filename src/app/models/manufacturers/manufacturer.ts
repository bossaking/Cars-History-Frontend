import {CarModel} from "../car-models/car-model";

export interface Manufacturer{
  id:number;
  name:string;
  modelsCount:number;
  carModels:CarModel[];
}

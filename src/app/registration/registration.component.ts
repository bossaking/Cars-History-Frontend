import { Component, OnInit } from '@angular/core';
import {StepperOrientation} from "@angular/cdk/stepper";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  hide = true;
  hideRepeat = true;

  orientation: StepperOrientation = 'vertical';

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      if(result.matches){
        this.orientation = 'vertical';
      }else{
        this.orientation = 'horizontal';
      }
    });
  }

  ngOnInit(): void {
  }

}

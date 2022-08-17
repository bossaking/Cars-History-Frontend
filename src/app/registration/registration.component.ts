import {Component, OnInit, ViewChild} from '@angular/core';
import {StepperOrientation} from "@angular/cdk/stepper";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Globals} from "../shared/globals";
import {matchPasswordsValidator} from "../shared/match-password.directive";
import {RegisterUserRequest} from "../models/auth/register-user-request";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {RegisterMechanicRequest} from "../models/auth/register-mechanic-request";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  mechanicRegistered = true;

  hide = true;
  hideRepeat = true;

  orientation: StepperOrientation = 'vertical';
  userPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  mechanicPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: this.userPassword,
    repeatPassword: new FormControl('', [Validators.required, matchPasswordsValidator(this.userPassword)])
  });

  mechanicForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: this.mechanicPassword,
    repeatPassword: new FormControl('', [Validators.required, matchPasswordsValidator(this.mechanicPassword)])
  });

  firmForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    regon: new FormControl('', [Validators.required]),
    nip: new FormControl('', [Validators.required])
  });

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      if (result.matches) {
        this.orientation = 'vertical';
      } else {
        this.orientation = 'horizontal';
      }
    });
  }

  ngOnInit(): void {
  }

  getRequiredErrorMessage() {
    return Globals.required;
  }

  getInvalidEmailErrorMessage() {
    return Globals.invalidEmail;
  }

  getPasswordMinLengthErrorMessage() {
    return Globals.passwordLengthError;
  }

  getMismatchPasswordsError() {
    return Globals.passwordsMismatchError;
  }

  getTakenEmailError() {
    return Globals.takenEmailError;
  }

  registerUser() {

    this.userForm.controls['repeatPassword'].updateValueAndValidity();

    if (this.userForm.controls['email'].errors?.['required'] === undefined && this.userForm.controls['email'].errors?.['email'] === undefined) {
      this.userForm.controls['email'].setErrors(null);
    }

    if (this.userForm.invalid) {
      return;
    }

    let registerUser: RegisterUserRequest = {
      name: this.userForm.controls['name'].value!,
      surname: this.userForm.controls['surname'].value!,
      email: this.userForm.controls['email'].value!,
      password: this.userForm.controls['password'].value!
    }

    this.authService.register(registerUser).subscribe(result => {
      if (result === "The email has already been taken.") {
        this.userForm.controls['email'].setErrors({'taken': true});
        return;
      }

      this.router.navigate(['/']);
    });
  }

  @ViewChild('stepper') private myStepper: MatStepper | undefined;

  goBack(){
    this.myStepper?.previous();
  }

  goForward(){
    this.myStepper?.next();
  }

  registerMechanic() {

    this.mechanicForm.controls['repeatPassword'].updateValueAndValidity();

    if (this.mechanicForm.controls['email'].errors?.['required'] === undefined && this.mechanicForm.controls['email'].errors?.['email'] === undefined) {
      this.mechanicForm.controls['email'].setErrors(null);
    }

    if (this.mechanicForm.invalid) {
      this.goBack();
      return;
    }

    if(this.firmForm.invalid){
      return;
    }

    let data: RegisterMechanicRequest = {
      name: this.mechanicForm.controls['name'].value!,
      surname: this.mechanicForm.controls['surname'].value!,
      email: this.mechanicForm.controls['email'].value!,
      password: this.mechanicForm.controls['password'].value!,
      title: this.firmForm.controls['title'].value!,
      city: this.firmForm.controls['city'].value!,
      address: this.firmForm.controls['address'].value!,
      regon: this.firmForm.controls['regon'].value!,
      nip: this.firmForm.controls['nip'].value!,
    }

    this.authService.registerMechanic(data).subscribe(result => {
      if (result === "The email has already been taken.") {
        this.mechanicForm.controls['email'].setErrors({'taken': true});
        this.goBack();
        return;
      }

      this.mechanicRegistered = true;

    });

  }
}

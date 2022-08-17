import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {matchPasswordsValidator} from "../shared/match-password.directive";
import {Globals} from "../shared/globals";
import {AuthService} from "../services/auth.service";
import {LoginUserRequest} from "../models/auth/login-user-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router:Router) {
  }

  ngOnInit(): void {
  }

  getRequiredErrorMessage() {
    return Globals.required;
  }

  getMismatchPasswordError(){
    return Globals.wrongPassword;
  }

  getWrongEmailError(){
    return Globals.wrongEmail;
  }

  getInactiveUserError(){
    return Globals.inactiveUser;
  }

  login() {

    if(this.loginForm.controls['password'].errors !== null && this.loginForm.controls['password'].errors!['required'] === undefined){
      this.loginForm.controls['password'].setErrors(null);
    }

    if(this.loginForm.controls['email'].errors !== null && this.loginForm.controls['email'].errors!['required'] === undefined){
      this.loginForm.controls['email'].setErrors(null);
    }

    if (this.loginForm.invalid) {
      return;
    }

    let data: LoginUserRequest = {
      email: this.loginForm.controls['email'].value!,
      password: this.loginForm.controls['password'].value!
    };

    this.authService.login(data).subscribe(result => {
      if(typeof result === "string"){
        switch (result){
          case "Password mismatch":
            this.loginForm.controls['password'].setErrors({mismatch:true});
            break;
          case "User does not exist":
            this.loginForm.controls['email'].setErrors({notExist:true});
            break;
          case "User is inactive":
            this.loginForm.controls['email'].setErrors({inactive:true});
            break;
        }

        return;
      }

      this.router.navigate(['/']);
    });
  }

}

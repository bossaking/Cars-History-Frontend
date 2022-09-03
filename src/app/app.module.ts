import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatSliderModule} from '@angular/material/slider';
import {HeaderComponent} from './header/header.component';
import {FlexModule} from "@angular/flex-layout";
import {RegistrationComponent} from './registration/registration.component';
import {RouterModule} from "@angular/router";
import {MatTabsModule} from '@angular/material/tabs';
import {PortalModule} from '@angular/cdk/portal';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from "@angular/forms";
import {MatchPasswordDirective} from "./shared/match-password.directive";
import {NgxSpinnerModule} from "ngx-spinner";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {MatMenuModule} from "@angular/material/menu";
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UsersComponent } from './users/users.component';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { FuelTypesComponent } from './fuel-types/fuel-types.component';
import {AuthInterceptorService} from "./services/interceptors/auth-interceptor.service";
import { NewFuelTypeDialogComponent } from './new-fuel-type-dialog/new-fuel-type-dialog.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { EditFuelTypeDialogComponent } from './edit-fuel-type-dialog/edit-fuel-type-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    MatchPasswordDirective,
    LoginComponent,
    AdminPanelComponent,
    UsersComponent,
    RegistrationRequestsComponent,
    ManufacturersComponent,
    FuelTypesComponent,
    NewFuelTypeDialogComponent,
    ConfirmDeleteDialogComponent,
    EditFuelTypeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FlexModule,
    MatTabsModule,
    PortalModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      {path: 'register', component: RegistrationComponent},
      {path: 'login', component: LoginComponent},
      {
        path: 'admin',
        component: AdminPanelComponent,
        children: [
          {
            path: 'users',
            component: UsersComponent
          },
          {
            path: 'registration-requests',
            component: RegistrationRequestsComponent
          },
          {
            path: 'manufacturers',
            component: ManufacturersComponent
          },
          {
            path: 'fuel-types',
            component: FuelTypesComponent
          }
        ]
      }
    ]),
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatMenuModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

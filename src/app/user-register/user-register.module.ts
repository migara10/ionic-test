import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRegisterPageRoutingModule } from './user-register-routing.module';

import { UserRegisterPage } from './user-register.page';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxOtpInputComponent } from 'ngx-otp-input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRegisterPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    NgxOtpInputComponent,
    
  ],
  declarations: [UserRegisterPage]
})
export class UserRegisterPageModule {}

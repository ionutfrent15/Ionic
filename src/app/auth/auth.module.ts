import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthService} from './auth.service';
import {LoginPage} from './login/login.page';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
    IonicModule
  ],
  providers: [AuthService]
})
export class AuthModule { }

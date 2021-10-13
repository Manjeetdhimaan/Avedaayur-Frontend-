import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { Tab1Component } from './tab1/tab1.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './editUser-profile/user-profile.component'
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { AllUsersComponent } from './core/all-users/all-users.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { UsersComponent } from './UI/users/users.component';
import { ApiServiceService } from './services/api-service.service';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    Tab1Component,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    HeaderComponent,
    HomeComponent,
    AllUsersComponent,
    ProfileComponent,
    AdminLoginComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    IonicModule.forRoot()
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { Tab1Component } from './tab1/tab1.component';
import { RegisterComponent } from './UI/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './editUser-profile/user-profile.component'
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { AllUsersComponent } from './core/all-users/all-users.component';
import { ProfileComponent } from './loggedInUserProfile/profile.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { UsersComponent } from './UI/users/users.component';
import { ApiServiceService } from './services/api-service.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { LeavesComponent } from './core/leaves/leaves.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    LeavesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    IonicModule.forRoot()
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent],
})
export class AppModule { }

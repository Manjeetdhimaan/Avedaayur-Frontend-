import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './core/all-users/all-users.component';
import { HomeComponent } from './core/home/home.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './UI/users/register/register.component';
import { UsersComponent } from './UI/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './editUser-profile/user-profile.component';
import { Tab1Component } from './tab1/tab1.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'editProfile', component: UserProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'userlogin', component: LoginComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'allusers', component: AllUsersComponent },
  { path: 'user', component: UsersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'tab', component: Tab1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

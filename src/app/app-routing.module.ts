import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './core/all-users/all-users.component';
import { HomeComponent } from './core/home/home.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './UI/register/register.component';
import { UsersComponent } from './UI/users/users.component';
import { ProfileComponent } from './loggedInUserProfile/profile.component';
import { UserProfileComponent } from './editUser-profile/user-profile.component';
import { Tab1Component } from './tab1/tab1.component';
import { LeavesComponent } from './core/leaves/leaves.component';
import { CheckLeavesComponent } from './core/all-users/check-leaves/check-leaves.component';
import { EmployeeLeaveComponent } from './core/all-users/check-leaves/employee-leave/employee-leave.component';
import { EditAdminProfileComponent } from './edit-admin-profile/edit-admin-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'editProfile/:name', component: UserProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'userlogin', component: LoginComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'allusers', component: AllUsersComponent},
  { path: 'editAdminProfile', component: EditAdminProfileComponent },
  { path: 'user/:name', component: UsersComponent, data: {title: 'allusers'} },
  { path: 'checkleaves', component: CheckLeavesComponent },
  { path: 'employeeLeaves/:name', component: EmployeeLeaveComponent },
  { path: 'profile/:name', component: ProfileComponent },
  { path: 'tab', component: Tab1Component },
  { path: 'leaves/:name', component: LeavesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

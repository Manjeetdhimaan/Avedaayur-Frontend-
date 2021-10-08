import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './core/all-users/all-users.component';
import { HomeComponent } from './core/home/home.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { ApplyLeaveComponent } from './pages/apply-leave/apply-leave.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './UI/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './editUser-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'editProfile', component: UserProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'userlogin', component: LoginComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'allusers', component: AllUsersComponent },
  { path: 'user', component: UsersComponent },
  { path: 'applyLeave', component: ApplyLeaveComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

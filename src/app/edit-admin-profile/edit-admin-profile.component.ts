import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-edit-admin-profile',
  templateUrl: './edit-admin-profile.component.html',
  styleUrls: ['./edit-admin-profile.component.scss']
})
export class EditAdminProfileComponent implements OnInit {

  constructor(private router: Router, 
    private http: HttpClient, 
    private apiService: ApiServiceService,
    private spinner: NgxSpinnerService) { }
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean = false;
  id: any
  user: any;
  editAdminProfileForm: FormGroup;
  ngOnInit(): void {
    this.spinner.show()
    this.editAdminProfileForm = new FormGroup({
      email: new FormControl(this.email),
      password: new FormControl(this.password),
      confirmPassword: new FormControl(this.confirmPassword),
    })

    const admin = localStorage.getItem('admin');

    if (admin == null) {
      this.router.navigateByUrl('/adminlogin', { replaceUrl: true })
    }

    if (admin !== null) {
      this.isLoading = true;
      const loggedInUser = JSON.parse(admin)
      this.user = loggedInUser;
      this.id = loggedInUser.id
      delete loggedInUser.password
      this.http.get(`${this.apiService.url}/admin`).subscribe(res => {
        //logged in user
        this.user = res;
        this.email = this.user.email;
        this.isLoading = false
        // getting attendance of logged in user
      
      },
        error => {
          console.log(error);
        })
    }
  }

  onUpdateValues() {

    this.isLoading = true;
    const loggedInUser = localStorage.getItem('admin');
    let credentials = {
      email: this.editAdminProfileForm.value.email,
      password: this.editAdminProfileForm.value.password,
      id:this.id
    }
    if(!credentials.password){
      credentials.password= this.user.password
    }
    console.log(credentials)
    if (this.password !== this.confirmPassword) {
      this.isLoading = false;
      Swal.fire('', 'passwords do no match!', 'warning')
      return;
    }
    else if (loggedInUser !== null) {
      console.log(this.id)
      this.http.post(`${this.apiService.url}/admin/updateAdminCredentials/${this.id}`, credentials).subscribe(res => {
        this.isLoading = false;
        this.user = res
        console.log(res)
        Swal.fire('Success!', 'Data saved succussfully!', 'success')
      }, error => {
        // Error 
        this.isLoading = false;
        Swal.fire('Error!', error, 'error')
        console.log(error);
      })
    }

  }
}

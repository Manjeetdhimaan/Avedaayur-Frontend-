import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fullname: string;
  email: string;
  password: string;
  pic: string;
  service: string = "none";
  bio: string;
  joindate: any;
  isServiceProvider: boolean = false;
  isLoading: boolean = false;
  phone: string;

  @Input() layout='register';

  submitted = false;
  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
  }



  adminForm= new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  adminlogin() {
    this.isLoading = true;
    let credentials = {
      email: this.adminForm.value.email,
      password: this.adminForm.value.password,
    }
    this.http.post(`http://localhost:5000/admin/adminLogin`, credentials).subscribe(res => {
      this.isLoading = false;
      const loggedAdmin  = localStorage.setItem('admin', JSON.stringify(res));
      
      this.router.navigateByUrl('/allusers', {replaceUrl:true});
    }, error => {
      this.isLoading = false;
      Swal.fire('Error!', error.error.error, 'error')
      // this.presentAlert('Login failed', error.error.error)
    })
  }

  loginForm= new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  userlogin() {
    this.isLoading = true;
    let credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.http.post(`http://localhost:5000/users/login`, credentials).subscribe(res => {
      this.isLoading = false;
      
      localStorage.setItem('User', JSON.stringify(res));
      this.router.navigateByUrl('profile', { replaceUrl: true });
    }, error => {
      this.isLoading = false;
      Swal.fire('Error!', error.error.error, 'error')
      // this.presentAlert('Login failed', error.error.error);
    })
  }

  registerForm= new FormGroup({
    fullname: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    phone: new FormControl(),
    pic: new FormControl(),
    service: new FormControl(),
    bio: new FormControl(),
    joindate: new FormControl(),
  })

  onRegister() {
    this.isLoading = true;
    let user = {
      fullname: this.registerForm.value.fullname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: this.registerForm.value.phone,
      pic: this.registerForm.value.pic,
      service: this.registerForm.value.service,
      bio: this.registerForm.value.bio,
      joindate: this.registerForm.value.joindate,
      isServiceProvider: this.isServiceProvider,
    }
    this.http.post('http://localhost:5000/users/register', user)
      .subscribe(res => {
        this.isLoading = false;
        localStorage.setItem('User', JSON.stringify(res));
        // Success
        Swal.fire('Registeration successfull!', 'Login Now!', 'success')
        // this.presentAlert('Registration successfull', 'Login Now');
        this.router.navigateByUrl('userlogin');
      },
        error => {
          this.isLoading = false;
          Swal.fire('Registeration Failed!', error.error.error, 'error')
        })
  }

  onServiceSelect(event: any) {
    console.log(event);
    let response = event.detail.value;
    if (response == "no" || response == "No" || response == "NO") {
      this.isServiceProvider = false;
    }
    else {
      this.isServiceProvider = true;
    }
  }
}

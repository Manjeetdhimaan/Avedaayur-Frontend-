import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  registerForm: FormGroup;
  submitted = false;
  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.spinner.show();
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
  });
  

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  adminlogin() {
    this.isLoading = true;
    let credentials = {
      email: this.email,
      password: this.password,
    }
    this.http.post(`http://localhost:5000/admin/adminLogin`, credentials).subscribe(res => {
      this.isLoading = false;
      localStorage.setItem('admin', JSON.stringify(res));
      this.router.navigateByUrl('allusers', {replaceUrl:true});
    }, error => {
      this.isLoading = false;
      Swal.fire('Error!', error.error.error, 'error')
      // this.presentAlert('Login failed', error.error.error)
    })
  }

  userlogin() {
    this.isLoading = true;
    let credentials = {
      email: this.email,
      password: this.password
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



  register() {
    this.isLoading = true;
    let user = {
      fullname: this.fullname,
      email: this.email,
      password: this.password,
      phone: this.phone,
      pic: this.pic,
      service: this.service,
      bio: this.bio,
      joindate: this.joindate,
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

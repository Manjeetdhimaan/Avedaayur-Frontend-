import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  constructor(private http: HttpClient,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit(): void {
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

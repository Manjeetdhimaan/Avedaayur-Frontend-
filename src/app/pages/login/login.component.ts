import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  isLoading: boolean = false;
  constructor(private http: HttpClient,
    private router: Router, 
    private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
  }
  login() {
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

}

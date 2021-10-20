import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  users: any;
  newUser: any
  isEmployee= false;
  constructor(private router: Router, private http: HttpClient,private apiService: ApiServiceService) { }

  ngOnInit(): void {
    const admin = localStorage.getItem('admin');
    if (admin == null) {
      this.router.navigateByUrl('/adminlogin', { replaceUrl: true })

    }
    else {
      this.http.get('http://localhost:5000/users').subscribe(res => {
        this.users = res;
        // this.originalServiceProvider = res;
      },
        error => {
          console.log(error)
        })
    }

  }
  logout() {
    this.apiService.adminLogout();
  }
  onSelectUser(user: any[]) {
    this.newUser = user;
    localStorage.setItem('selected user', JSON.stringify(this.newUser));
    this.router.navigateByUrl('/user')
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  users: any;
  newUser:any
  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    const user = localStorage.getItem('admin');
    if (user == null) {
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
    localStorage.removeItem('admin');
    this.router.navigateByUrl('/adminlogin', { replaceUrl: true })
  }
  onSelectUser(user:any[]){
    console.log('user selected')
    this.newUser = user;
    localStorage.setItem('new user', JSON.stringify(this.newUser));
    this.router.navigateByUrl('/user')
  }
}

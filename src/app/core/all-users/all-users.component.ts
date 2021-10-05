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
  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    const user = localStorage.getItem('User');
    if (user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true })

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
  

}

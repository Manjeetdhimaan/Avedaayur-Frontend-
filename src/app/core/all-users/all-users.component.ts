import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  users: any;
  selectedUser: any;
  isEmployee = false;
  leaveArray: any[] = []
  p: number = 1;
  constructor(private router: Router,
    private http: HttpClient,
    private apiService: ApiServiceService,
    private userService : UsersService) { }

  ngOnInit(): void {
    const admin = localStorage.getItem('admin');
    if (admin == null) {
      this.router.navigateByUrl('/adminlogin', { replaceUrl: true })
    }
    else {
      this.http.get(`${this.apiService.url}/users`).subscribe(res => {
        this.users = res;
        this.users.map((a: any) => {
          this.leaveArray.push(a.leaves)
        })
        // this.originalServiceProvider = res;
      },
        error => {
          console.log(error)
        })
    }
  }

  test(){

  }

  onSelectUser(user: any[]) {
    this.userService.user = user;
    this.selectedUser = user;
  const a =   this.selectedUser.fullname.toLowerCase().split(' ')
  const b = a.join('-');
    localStorage.setItem('selected user', JSON.stringify(this.selectedUser));
    this.router.navigate(['/', b])
  }
}

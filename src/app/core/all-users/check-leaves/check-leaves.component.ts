import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-check-leaves',
  templateUrl: './check-leaves.component.html',
  styleUrls: ['./check-leaves.component.scss']
})
export class CheckLeavesComponent implements OnInit {
  constructor(private router: Router,
    private http: HttpClient,
    private apiService: ApiServiceService) { }

  users: any;
  selectedUser: any;
  leaveArray: any[] = [];
  counter: any = 0
  ngOnInit(): void {

    const admin = localStorage.getItem('admin');
    if (admin == null) {
      this.router.navigateByUrl('/adminlogin', { replaceUrl: true });
    }
    else {
      this.http.get(`${this.apiService.url}/users`).subscribe(res => {
        this.users = res;
        this.users.map((a: any) => {
          this.leaveArray.push(a.leaves)
        })
      },
        error => {
          console.log(error);
        })
    }
    
      
 
  } 

  onSelectUser(user: any[]) {
    this.selectedUser = user;
    localStorage.setItem('selected userLeave', JSON.stringify(this.selectedUser));
    const a = this.selectedUser.fullname.toLowerCase().split(' ')
    const b = a.join('-');
    this.router.navigate(['/employeeLeaves', b]);
  }
}

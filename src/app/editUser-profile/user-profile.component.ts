import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  input: any;
  fullname: string;
  email: string;
  password: string;
  pic: string;
  service: string = "none";
  bio: string;
  joindate: any;
  isServiceProvider: boolean = false;
  isLoading: boolean = false;
  id: any
  selectedService: any;
  users: any;
  originalServiceProvider: any


  @ViewChild('f') leaveForm: NgForm;
  constructor(private router: Router,
    private http: HttpClient,
    private apiService: ApiServiceService) {
  }

  totalLeaves = 10;
  remainingLeaves: number;
  appliedLeaves: number;
  leaveType: string;
  applyLeaveFrom: any;
  applyLeaveTo: any;
  rl: any
  ngOnInit(): void {
    this.http.get('http://localhost:5000/users').subscribe(res => {

    },
      error => {
        console.log(error)
      })
    const user = localStorage.getItem('User');
    if (user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true })
    }
    // else {
    //   this.http.get('http://localhost:5000/users').subscribe(res => {
    //     this.users = res;
    //     this.originalServiceProvider = res;
    //   },
    //     error => {
    //       console.log(error)
    //     })
    // }
    // comparing data of database users with loggedIn user (credentials stored in local storage)
    if (user !== null) {
      const loggedInUser = JSON.parse(user)
      delete loggedInUser.password
      this.http.get(`http://localhost:5000/users/${loggedInUser._id}`).subscribe(res => {
        this.users = res;
        // this.users.map((val: any) => {
        //   val.map((a: any) => {
        //     if (specificUser.email == a.email) {
        //       this.users = a;
        //     }
        //   })
        // })
        this.rl = [res].map((n: any) => {
          if (loggedInUser._id == n._id) {
            if ((n.remainingLeaves) === undefined) {
              this.remainingLeaves = this.totalLeaves;
            }
            else {
              this.remainingLeaves = n.remainingLeaves;
              this.totalLeaves = this.remainingLeaves;
              //updating total leaves in database;
              this.applyLeave();
            }
          }
        })
      },
        error => {
          console.log(error)
        })
    }
  }

  onServiceSelect(e: any) {
    this.users = this.originalServiceProvider
    this.selectedService = e.detail.value
    if (e.detail.value == "All") {
      this.users = this.originalServiceProvider
    }
    else {
      this.users = this.users.filter((serviceProv: any) => {
        return serviceProv.service == this.selectedService
      })
    }
  }


  logout() {
    this.apiService.logout();
  }


  onUpdateValues() {
    const loggedInUser = localStorage.getItem('User');
    let user = {
      fullname: this.fullname,
      email: this.email,
      password: this.password,
      service: this.service,
      bio: this.bio,
      joindate: this.joindate,
      isServiceProvider: this.isServiceProvider,
    }
    if (loggedInUser !== null) {
      let parsedData = JSON.parse(loggedInUser);
      this.id = parsedData["_id"];
      this.http.put(`http://localhost:5000/users/update/${this.id}`, user).subscribe(res => {
        console.log(user)
        Swal.fire('Success!', 'Data saved succussfully!', 'success')
      }, error => {
        // Error 
        Swal.fire('Error!', 'Something went wrong!', 'error')
        console.log(error);
      })
    }
  }


  applyLeave() {
    this.appliedLeaves = (+this.applyLeaveTo.slice(8) - +this.applyLeaveFrom.slice(8));
    this.remainingLeaves = this.totalLeaves - this.appliedLeaves;
    console.log("remaining leaves", this.remainingLeaves);
    console.log("applied leaves", +this.applyLeaveTo.slice(8) - +this.applyLeaveFrom.slice(8));

    const loggedInUser = localStorage.getItem('User');
    const leaves = {
      leaveType: this.leaveType,
      totalLeaves: this.totalLeaves,
      remainingLeaves: this.remainingLeaves
    }
    if (loggedInUser !== null) {
      let parsedData = JSON.parse(loggedInUser);
      this.id = parsedData["_id"];
      this.http.post(`http://localhost:5000/users/insert/${this.id}`, leaves).subscribe(res => {
        console.log(res)
        Swal.fire('Success!', 'Applied leave succesfully!', 'success')
      }, error => {
        // Error 
        Swal.fire('Error!', error.statusText, 'error')
      })
    }
  }
}

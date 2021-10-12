import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  confirmPassword: string;
  pic: string;
  service: string = "none";
  bio: string;
  joindate: any;
  isServiceProvider: boolean = false;
  isLoading: boolean = false;
  id: any
  selectedService: any;
  user: any;
  originalServiceProvider: any
  constructor(private router: Router,
    private http: HttpClient,
    private apiService: ApiServiceService,
    private spinner: NgxSpinnerService) {
  }

  totalLeaves = 24;
  remainingLeaves: number;
  appliedLeaves: number;
  leaveType: string;
  applyLeaveFrom: any;
  applyLeaveTo: any;
  rl: any
  attendance: any[];

  ngOnInit(): void {
    this.spinner.show();
    // this.http.get('http://localhost:5000/user').subscribe(res => {
    //   [res].map((n: any) => {
    //     n.map((a: any) => {
    //       this.attendance = a.attendance;
    //       console.log('attendance', this.attendance)
    //     })
    //   })
    // },
    //   error => {
    //     console.log(error)
    //   })
    const user = localStorage.getItem('User');
    if (user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true })
    }
    // else {
    //   this.http.get('http://localhost:5000/user').subscribe(res => {
    //     this.user = res;
    //     this.originalServiceProvider = res;
    //   },
    //     error => {
    //       console.log(error)
    //     })
    // }
    // comparing data of database user with loggedIn user (credentials stored in local storage)
    if (user !== null) {
      const loggedInUser = JSON.parse(user)
      this.id= loggedInUser._id
      delete loggedInUser.password
      this.http.get(`http://localhost:5000/users/${this.id}`).subscribe(res => {
        //logged in user
        this.user = res;
        // getting attendance of logged in user
        this.attendance = this.user.attendance;
        this.attendance = this.attendance.reverse();
        // getting remaining leaves , total leaves and updating leaves data on databse
        [res].map((n: any) => {
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
          console.log(error);
        })
    }
  }

  onServiceSelect(e: any) {
    this.user = this.originalServiceProvider
    this.selectedService = e.detail.value
    if (e.detail.value == "All") {
      this.user = this.originalServiceProvider
    }
    else {
      this.user = this.user.filter((serviceProv: any) => {
        return serviceProv.service == this.selectedService
      })
    }
  }


  logout() {
    this.apiService.userlogout();
  }


  onUpdateValues() {
    this.isLoading = true;
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
    if (this.password !== this.confirmPassword) {
      this.isLoading = false;
      Swal.fire('Error!', 'passwords do no match!', 'error')
      return;
    }
    else if (loggedInUser !== null) {
      let parsedData = JSON.parse(loggedInUser);
      this.id = parsedData["_id"];
      this.http.put(`http://localhost:5000/users/update/${this.id}`, user).subscribe(res => {
        this.isLoading = false;
        Swal.fire('Success!', 'Data saved succussfully!', 'success')
      }, error => {
        // Error 
        this.isLoading = false;
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
        Swal.fire('Success!', 'Applied leave succesfully!', 'success')
      }, error => {
        // Error 
        Swal.fire('Error!', error.statusText, 'error')
      })
    }
  }


  checkIn(){
    const credentials = {
      email:this.email,
      password:this.password
    }
    this.router.navigateByUrl('/profile')
    Swal.fire('Success!', 'Checked In!', 'success')
    this.http.post(`http://localhost:5000/users/${this.id}/enter`, credentials).subscribe(res => {
      debugger
      console.log(res)
     
    }, error => {
      // Error 
      Swal.fire('Error!', error.statusText, 'error')
    })
  }

  checkOut(){
    const credentials = {
      email:this.email,
      password:this.password
    }
    this.router.navigateByUrl('/profile')

    Swal.fire('Success!', 'Checked out!', 'success')

    this.http.post(`http://localhost:5000/users/${this.id}/exit`, credentials).subscribe(res => {
      debugger
    }, error => {
      // Error 
      Swal.fire('Error!', error.statusText, 'error')
    })
  }
  
}
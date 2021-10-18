import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  originalServiceProvider: any;
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
  attendance: any[];
  editProfileForm:FormGroup

  ngOnInit(): void {
    this.editProfileForm= new FormGroup({
      fullname: new FormControl(this.fullname),
      email: new FormControl(this.email),
      bio: new FormControl(this.bio),
      password: new FormControl(this.password),
      confirmPassword: new FormControl(this.confirmPassword),
    })

    this.spinner.show();
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
      this.id = loggedInUser._id
      delete loggedInUser.password
      this.http.get(`http://localhost:5000/users/${this.id}`).subscribe(res => {
        //logged in user
        this.user = res;
       this.fullname=this.user.fullname;
       this.email=this.user.email;
       this.pic=this.user.pic;
       this.bio=this.user.bio;
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
      fullname: this.editProfileForm.value.fullname,
      email: this.editProfileForm.value.email,
      password: this.editProfileForm.value.password,
      bio: this.editProfileForm.value.bio,
    }
    if (this.password !== this.confirmPassword) {
      this.isLoading = false;
      Swal.fire('', 'passwords do no match!', 'warning')
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
        Swal.fire('Error!', error, 'error')
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


  checkIn() {
    this.isLoading=true;
    this.router.navigateByUrl('/profile');
    this.http.post(`http://localhost:5000/users/${this.id}/enter`, this.id).subscribe(() => {
      this.isLoading=false;
      Swal.fire('Success!', 'Checked In!', 'success');
      this.router.navigateByUrl('/profile');
    }, error => {
      // Error 
      this.isLoading=false;
      Swal.fire('', error.error.text, 'warning');
    })
  }

  
  profileForm = new FormGroup({
    exitType: new FormControl(''),
  });

  exitType: string="Full day";
  checkOut() {
    this.isLoading=true;
    this.popUp = false;
    const credentials = {
      exitType: this.profileForm.value.exitType
    }

    this.http.post(`http://localhost:5000/users/${this.id}/exit`, credentials).subscribe(() => {
      this.isLoading=false;
      Swal.fire('Success!', 'Checked out!', 'success');
      this.router.navigateByUrl('/profile')
    }, error => {
      // Error 
      this.isLoading=false;
      Swal.fire('', error.error.text, 'warning');
    })
    // Swal.fire({
    //   title: 'You will be checked out',
    //   text: 'Are you sure you wish to check out?',
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, check me out!',
    //   cancelButtonText: 'No, keep me check in'
    // }).then((result) => {
    //   if (result.value) {
    //     // Swal.fire(  
    //     //   'Logged out!',  
    //     //   'You are logged out.',  
    //     //   'success'  
    //     // ) 
      
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     return;
    //   }
    // })
  }

  getAttendance: boolean = false;
  getApplyLeave: boolean = false;
  popUp: boolean = false;

  onGetAttendance() {
    this.getAttendance = true;
    this.getApplyLeave = false;
  }
  onGetSettings() {
    this.getAttendance = false;
    this.getApplyLeave = false;
  }
  onGetApplyLeave() {
    this.getAttendance = false;
    this.getApplyLeave = true;
  }
  openForm() {
    this.popUp = true;
  }
  closeForm() {
    this.popUp = false;
  }

}

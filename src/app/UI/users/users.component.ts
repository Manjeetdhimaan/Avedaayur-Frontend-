import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiServiceService,
     private router: Router,
     private http: HttpClient,
     private spinner:NgxSpinnerService) { }
  @Input() editProfile:boolean=false;
  @Input() editAttendance:boolean = true;
  @Input() user: any
   
  attendance: any;
  isLoading: boolean = false;
  id: any
  popUp: boolean = false;
  p: number = 1
  ngOnInit(): void {
    this.popUp=false
    this.spinner.show();
    const item = (localStorage.getItem('selected user'));
    const loggedInUser = (localStorage.getItem('User'));
    if (item !== null && loggedInUser == null) {
      let parsedData = JSON.parse(item);
      this.id = parsedData["_id"];
      this.http.get(`${this.apiService.url}/users/${this.id}`).subscribe(res => {
        //logged in user
        this.user = res;
        this.attendance = this.user.attendance.reverse();
        this.attendance.map((a: any) => {
          if (a.exit == undefined) {
            a.exit = ''
          }
        });
      },
        error => {
          console.log(error);
        })
    }
    if (item == null && loggedInUser !== null) {
      let parsedDataOLoggedInuser = JSON.parse(loggedInUser);
      this.id = parsedDataOLoggedInuser["_id"];
      this.http.get(`${this.apiService.url}/users/${this.id}`).subscribe(res => {
        //logged in user
        this.user = res;
        this.attendance = this.user.attendance.reverse();
        this.attendance.map((a: any) => {
          if (a.exit == undefined) {
            a.exit = ''
          }
        });
      },
        error => {
          console.log(error);
        })
    }
  }

  checkIn() {
    this.isLoading = true;
    
    this.http.post(`${this.apiService.url}/users/${this.id}/enter`, this.id).subscribe(() => {
      this.isLoading = false;
      Swal.fire('Success!', `${this.user.fullname.toUpperCase()} Checked In!`, 'success');
      this.router.navigateByUrl('/allusers');
    }, error => {
      // Error 
      this.isLoading = false;
      Swal.fire('', `${this.user.fullname.toUpperCase()} already checked in today!`, 'warning');
      this.router.navigateByUrl('/allusers');
    })
  }


  profileForm = new FormGroup({
    exitType: new FormControl(''),
  });

  exitType: string = "Full day";
  checkOut() {
    this.isLoading = true;
    this.popUp = false;
    const credentials = {
      exitType: this.profileForm.value.exitType
    }

    this.http.post(`${this.apiService.url}/users/${this.id}/exit`, credentials).subscribe(() => {
      this.isLoading = false;
      Swal.fire('Success!', `${this.user.fullname.toUpperCase()} Checked out! `, 'success');
      this.router.navigateByUrl('/allusers');
    }, error => {
      // Error 
      this.isLoading = false;
      Swal.fire('', `${this.user.fullname.toUpperCase()} already checked out today`, 'warning');
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
  openForm() {
    this.popUp = true;
  }
  closeForm() {
    this.popUp = false;
  }

  ngOnDestroy(){
    localStorage.removeItem('selected user')
  }
}
    
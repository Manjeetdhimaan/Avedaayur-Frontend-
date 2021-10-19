import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  constructor(private apiService:ApiServiceService, private router:Router, private http: HttpClient) { }
user:any
attendance:any;
isLoading:boolean=false;
id:any
popUp:boolean =false;
p:number = 1
  ngOnInit(): void {
    const item = (localStorage.getItem('new user'));
    if (item !== null) {
      
      console.log(this.attendance)
      if (item !== null) {
        let parsedData = JSON.parse(item);
        this.id = parsedData["_id"];
        this.http.get(`${this.apiService.url}/users/${this.id}`).subscribe(res => {
          //logged in user
          this.user = res;
          this.attendance = this.user.attendance;
          // getting leaves of logged in user
       
          // getting remaining leaves , total leaves and updating leaves data on database
        },
          error => {
            console.log(error);
          })
  
      }
    }
    }
  
  
  checkIn() {
    this.isLoading = true;
    this.router.navigateByUrl('/profile');
    this.http.post(`${this.apiService.url}/users/${this.id}/enter`, this.id).subscribe(() => {
      this.isLoading = false;
      Swal.fire('Success!', 'Checked In!', 'success');
      this.router.navigateByUrl('/profile');
    }, error => {
      // Error 
      this.isLoading = false;
      Swal.fire('', error.error.text, 'warning');
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
      Swal.fire('Success!', 'Checked out!', 'success');
      this.router.navigateByUrl('/profile')
    }, error => {
      // Error 
      this.isLoading = false;
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
  openForm() {
    this.popUp = true;
  }
  closeForm() {
    this.popUp = false;
  }
}

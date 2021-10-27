import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiServiceService,
     private router: Router,
     private http: HttpClient,
     private spinner:NgxSpinnerService,private titleService: Title,
     private activatedRoute: ActivatedRoute) { }
  @Input() editProfile:boolean=false;
  @Input() editAttendance:boolean = true;
  @Input() user: any
   
  attendance: any;
  isLoading: boolean = false;
  id: any
  popUp: boolean = false;
  p: number = 1

  isEmployee:boolean = false;
  ngOnInit(): void {



    this.popUp=false
    this.spinner.show();
    const item = (localStorage.getItem('selected user'));
    const loggedInUser = (localStorage.getItem('User'));
    const admin = (localStorage.getItem('admin'));
    if(admin){
      this.isEmployee = false;
    }
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
      this.isEmployee = true;
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

  exitType: string = "Full day";

  profileForm = new FormGroup({
    exitType: new FormControl(this.exitType),
  });

  checkOut() {
    this.isLoading = true;
    this.popUp = false;
    const credentials = {
      exitType: this.profileForm.value.exitType
    }

    if(credentials.exitType == '' || !credentials.exitType){
      Swal.fire('Error', `Please provide exit type`, 'warning');
      this.isLoading = false;
    }
    else{
      this.http.post(`${this.apiService.url}/users/${this.id}/exit`, credentials).subscribe(() => {
        this.isLoading = false;
        Swal.fire('Success!', `${this.user.fullname.toUpperCase()} Checked out! `, 'success');
        this.router.navigateByUrl('/allusers');
      }, error => {
        // Error 
        this.isLoading = false;
        Swal.fire('', `${this.user.fullname.toUpperCase()} already checked out today`, 'warning');
      })
    }
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
    
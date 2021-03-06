import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.scss']
})
export class EmployeeLeaveComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient, private apiService: ApiServiceService, private spinner: NgxSpinnerService) { }
  id: any;
  user: any;
  leaves: any;
  p: number = 1;
  status: any;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.spinner.show();
    const selecetdUser = localStorage.getItem('selected userLeave');
    if (selecetdUser !== null) {
      let parsedData = JSON.parse(selecetdUser);
      this.id = parsedData["_id"];
      this.http.get(`${this.apiService.url}/users/${this.id}`).subscribe(res => {
        //logged in user
        this.user = res;
        // getting leaves of logged in user
        this.leaves = this.user.leaves.reverse();
        // getting remaining leaves , total leaves and updating leaves data on database
      },
        error => {
          console.log(error);
        })

    }
  }

  onRespondLeave(selected: any, event: any) {
    let matched = false;
    let b = ''
    this.leaves.map((a: any) => {
      if (a._id == selected._id && a.status == event.target.value) {
        Swal.fire('', `Already ${event.target.value}`, 'warning')
           matched = true
           return
      }
    })
    //getting previous leave status
    this.leaves.map((n: any) => {
      if (n._id == selected._id) {
        b = n.status
      }
    })
    if(matched==false){
      this.isLoading = true;
      let credentials = {
        id: selected._id,
        event: event.target.value,
        prevStatus:b
      }
  
      this.http.put(`${this.apiService.url}/users/updateLeaveStatus/${this.id}`, credentials).subscribe(res => {
        //logged in user
        this.isLoading = false;
        this.user = res;
        // getting leaves of logged in user
        this.leaves = this.user.leaves.reverse();
      },
        error => {
          console.log(error);
          this.isLoading = false;
        })
    }
    matched = false;
  }

  getCustomCss(status: any) {
    //Logic here;
    if (status == "Approved") {
      return 'success';
    }
    if (status == "Denied") {
      return 'danger';
    }
    return 'warn';
  }
  ngOnDestroy() {
    localStorage.removeItem('selected userLeave');
  }
}

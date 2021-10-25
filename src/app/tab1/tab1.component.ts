import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss']
})
export class Tab1Component implements OnInit {

  selectedService: any;
  users: any;
  originalServiceProvider: any
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get('http://localhost:5000/users').subscribe(res => {
      this.users = res;
      console.log(this.users)
      this.originalServiceProvider = res;
    },
      error => {
        console.log(error)
      })
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
    localStorage.removeItem('User');
    this.router.navigateByUrl('/login', { replaceUrl: true })

  }

 
}

import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  loggedInUser:any
  constructor( private apiService: ApiServiceService) { }
  ngOnInit(): void {
    const user = localStorage.getItem('User')
    if(user){
        this.loggedInUser = JSON.parse(user)
    }
  }


  userLogout() {
    this.apiService.userlogout();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  constructor( private apiService: ApiServiceService) { }
  ngOnInit(): void {
  }

  userLogout() {
    this.apiService.userlogout();
  }
}

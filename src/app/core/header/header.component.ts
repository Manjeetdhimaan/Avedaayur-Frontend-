import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  constructor(private router: Router, private apiService: ApiServiceService) { }
  ngOnInit(): void {
  }

  logout() {
    this.apiService.userlogout();
  }
}

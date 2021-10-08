import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn=false;
  constructor(private router:Router) { }
  ngOnInit(): void {
  }
  logout() {
    localStorage.removeItem('User');
    this.router.navigateByUrl('/userlogin', { replaceUrl: true });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('User');
    const admin = localStorage.getItem('admin');
    if (user === null && admin === null) {
      this.router.navigateByUrl('/userlogin', { replaceUrl: true })
    }
  }

}

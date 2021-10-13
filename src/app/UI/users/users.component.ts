import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }
  @Input() editProfile:boolean=false;
  @Input() user: any
  ngOnInit(): void {
    const item = (localStorage.getItem('new user'));
    if (item !== null) {
      const json = JSON.parse(item) ;
      this.user = json;
    }
  }
}
    
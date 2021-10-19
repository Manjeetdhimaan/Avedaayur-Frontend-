import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {

  constructor(private http: HttpClient, private apiService: ApiServiceService) { }
  id: any;
  user:any;
  leaves: any;
  p: number = 1;
  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('User');
    if (loggedInUser !== null) {
      let parsedData = JSON.parse(loggedInUser);
      this.id = parsedData["_id"];
      this.http.get(`${this.apiService.url}/users/${this.id}`).subscribe(res => {
        //logged in user
        this.user = res;
        // getting leaves of logged in user
        this.leaves = this.user.leaves.reverse();
        console.log(this.leaves);
        // getting remaining leaves , total leaves and updating leaves data on database
      },
        error => {
          console.log(error);
        })

    }
  }
}
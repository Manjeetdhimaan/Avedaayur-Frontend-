import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user=[]

  constructor(private http:HttpClient, private apiService: ApiServiceService) { 

      //  this.http.get(`${this.apiService.url}/users`).subscribe(res => {
      //   this.users = res;
      //   // this.users.map((a: any) => {
      //   //   this.leaveArray.push(a.leaves)
      //   // })
      //   // console.log(this.leaveArray) 
      //   // this.originalServiceProvider = res;
      // },
      //   error => {
      //     console.log(error)
      //   })
  }
  
}


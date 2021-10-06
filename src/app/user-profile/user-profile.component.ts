

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  fullname: string;
  email: string;
  password: string;
  pic: string;
  service: string = "none";
  bio: string;
  joindate:any;
  isServiceProvider: boolean = false;
  isLoading: boolean = false;
  id:any
  selectedService: any;
  users: any;
  originalServiceProvider: any
  constructor(private router: Router, 
    private route: ActivatedRoute,
    private http: HttpClient,
     private alertController: AlertController) { }

  ngOnInit(): void {

    const user = localStorage.getItem('User');
    if (user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true })

    }
    // else {
    //   this.http.get('http://localhost:5000/users').subscribe(res => {
    //     this.users = res;
    //     this.originalServiceProvider = res;
    //   },
    //     error => {
    //       console.log(error)
    //     })
    // }
    
    // comparing data of database users with loggedIn user (credentials stored in local storage)
    if (user !== null) {
      const specificUser = JSON.parse(user)
      this.http.get('http://localhost:5000/users').subscribe(res => {
        this.users = [res];
        this.users.map((val: any) => {
          val.map((a: any) => {
            if (specificUser.email == a.email) {
              this.users = a;
              // console.log(a._id)
            }
          })
        })
        
      },
        error => {
          console.log(error)
        })
    }
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
  update(event:any){
    
    const loggedInUser = localStorage.getItem('User');
    let user = {
      fullname: this.fullname,
      email: this.email,
      password: this.password,
      service: this.service,
      bio: this.bio,
      joindate:this.joindate,
      isServiceProvider: this.isServiceProvider,
    }
   
    if(loggedInUser !==null){
      let parsedData = JSON.parse(loggedInUser);
      this.id = parsedData["_id"]
      this.http.put('http://localhost:5000/users/update/:id', user).subscribe(res=>{
        console.log(res)
    }, error=>{
      console.log(error);
    })
    //  let data =  Object.values(parsedData)
    
      // for(let value in parsedData){
      //   if (parsedData.hasOwnProperty('_id')) {
      //     console.log(value + " = " + parsedData['_id']);
      // }
     
      // }

    }
 
    
  }



  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sure to Logout!',
      // message: 'Sure to Logout!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah: any) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}

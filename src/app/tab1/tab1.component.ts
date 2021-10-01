import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss']
})
export class Tab1Component implements OnInit {

  selectedService: any;
  users: any;
  originalServiceProvider: any
  constructor(private router: Router, private http: HttpClient, private alertController: AlertController) { }

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
    
    //comparing data of database users with loggedIn user (credentials stored in local storage)
    if (user !== null) {
      const specificUser = JSON.parse(user)
      this.http.get('http://localhost:5000/users').subscribe(res => {
        this.users = [res];
        this.users.map((val: any) => {
          val.map((a: any) => {
            if (specificUser.email == a.email) {
              this.users = a;
            }
          })
        })
        this.originalServiceProvider = res;
        console.log("hello", this.users)
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

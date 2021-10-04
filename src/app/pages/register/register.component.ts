import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstname: string;
  lastname: string;
  email: string;
  password: string;
  pic: string;
  service: string = "none";
  bio: string;
  joindate:any;
  isServiceProvider: boolean = false;
  isLoading: boolean = false;
  constructor(private http: HttpClient,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit(): void {
  }


  register() {
    this.isLoading = true;
    let user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      pic: this.pic,
      service: this.service,
      bio: this.bio,
      joindate:this.joindate,
      isServiceProvider: this.isServiceProvider,
    }
    if(this.firstname==''){
      console.log("error")
    }
    this.http.post('http://localhost:5000/users/register', user)
      .subscribe(res => {
        this.isLoading = false;
        localStorage.setItem('User', JSON.stringify(res))
        this.router.navigateByUrl('userprofile')
      },
        error => {
          this.isLoading = false
          this.presentAlert('Registration Failed', error.error.error)
        })
  }

  onServiceSelect(event: any) {
    console.log(event)
    let response = event.detail.value
    if (response == "no" || response == "No" || response == "NO") {
      this.isServiceProvider = false;
    }
    else {
      this.isServiceProvider = true;
    }
  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }

  validateRequiredInputs(){
    if(this.firstname=='' || this.lastname=='' || this.email=='' || this.pic==''){
      return false
    }
   return 
  }
}

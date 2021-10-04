import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  isLoading:boolean= false;

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }

  ngOnInit(): void {
  }
  login(){
    this.isLoading= true;
    let credentials = {
      email:this.email,
      password:this.password,
    }
    this.http.post('http://localhost:5000/users/login', credentials).subscribe(res=>{
      this.isLoading= false;
      localStorage.setItem('User', JSON.stringify(res));
      this.router.navigateByUrl('userprofile')
    }, error=>{
      this.isLoading= false;
      this.presentAlert('Login failed', error.error.error)
    })
    console.log(credentials)
  }

  async presentAlert(header:string, message: string) {
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
}

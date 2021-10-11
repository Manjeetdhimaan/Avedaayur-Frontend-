import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  email: string;
  password: string;
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }

  ngOnInit(): void {
  }
  login() {
    this.isLoading = true;
    let credentials = {
      email: this.email,
      password: this.password,
    }
    this.http.post(`http://localhost:5000/admin/adminLogin`, credentials).subscribe(res => {
      this.isLoading = false;
      localStorage.setItem('admin', JSON.stringify(res));
      this.router.navigateByUrl('allusers', {replaceUrl:true});
    }, error => {
      this.isLoading = false;
      Swal.fire('Error!', error.error.error, 'error')
      // this.presentAlert('Login failed', error.error.error)
    })
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
}

import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private apiService: ApiServiceService) { }
  
  ngOnInit(): void {

    
  }

  adminLogout(){
    this.apiService.adminLogout();
  }


}

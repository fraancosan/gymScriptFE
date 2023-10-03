import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { User } from '../services/auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData?:User;
  userLoginOn?:boolean;
  constructor(private loginService:LoginService){}

  ngOnInit():void {
    this.loginService.currentUserData.subscribe({
      next:(userData) => {
        this.userData = userData;
      }
    })
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
    console.log(this.userData);
    console.log(this.userLoginOn);
  }
  
}

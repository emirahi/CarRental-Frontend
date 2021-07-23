import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/models/Dto/userDto';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageHelper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  loginActive:boolean;
  user:UserDto;
  constructor(private authService:AuthService,
    private userService:UserService,
    private localStorageService:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.isLogin()
  }

  isLogin(){
    
    if (this.authService.isAuthenticated()) {
      this.loginActive = true;
      let email = this.localStorageService.getCurrentUser()
      if (email){
        this.userService.GetByMail(email).subscribe(response => {
          if (response.success) {
            this.user = response.data;
          }
        })
      }
      
    }
    else{
      this.loginActive = false;
    }
  }

  exit(){
    this.localStorageService.removeCurrentCustomer();
    this.localStorageService.removeToken();
    setTimeout(() => {
      this.router.navigate(["/login"])  
    }, 1500);
    
  }



}

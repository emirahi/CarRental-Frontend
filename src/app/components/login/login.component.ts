
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserForLoginDto } from "src/app/models/Dto/userForLoginDto";
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageHelper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private authService:AuthService,
    private formBuilder:FormBuilder,
    private localStorageService:LocalStorageService,
    private router:Router,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      "email":["",Validators.required],
      "password":["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let user:UserForLoginDto = Object.assign({},this.loginForm.value)
      this.authService.login(user).subscribe(response => {
        if (response.success) {
          this.localStorageService.addToken(response.data);
          this.localStorageService.addCurrentCustomer(user);
          this.toastrService.info(response.message,"Bilgilendirme")
          setTimeout(() => {
            this.router.navigate(["/"]);  
          }, 1500);
          
        }
      },errorRepsponse => {
        if (!errorRepsponse.error['success']) {
          this.toastrService.error(errorRepsponse.error['message'],"Hata")  
        }
      });
      
    }
  }

}

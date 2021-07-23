import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageHelper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(private authService:AuthService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      "firstname":["",Validators.required],
      "lastname":["",Validators.required],
      "email":["",Validators.required],
      "password":["",Validators.required]
    })
  }

  register(){
    if (this.registerForm.valid) {
      let user = Object.assign({},this.registerForm.value);
      this.authService.register(user).subscribe(response => {
        if (response.success) {
          this.localStorageService.addToken(response.data);
          this.toastrService.success(response.message,"Kayıt Başarılı")
        }
      },errorResponse => {
        console.log(errorResponse.error);
        try {
          if (errorResponse.error.Errors.length > 0) {
            let respArray = errorResponse.error.Errors;
            for (let i = 0; i < respArray.length; i++) {
              let nowArray = respArray[i];
              this.toastrService.error(nowArray.ErrorMessage,"Dikkat")
            }
          }          
        } catch (e) {
          if (errorResponse.error.success) {
            this.toastrService.error(errorResponse.error.message,"Hata")
          }
        }

        
      });

      this.router.navigate(["/"]);
    }
  }
  
}

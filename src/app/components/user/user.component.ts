import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/models/Dto/userDto';
import { User } from 'src/app/models/Entity/user';
import { LocalStorageService } from 'src/app/services/localStorageHelper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // normal şartlarda update için ayrıca bir component oluşturmam gerekirdi.
  isHidden:boolean;
  user:UserDto;
  userForm:FormGroup;
  typeChange = "password"
  constructor(private userService:UserService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.createUserForm();
    this.getUserInfo();


  }
  createUserForm(){
    this.userForm = this.formBuilder.group({
      "firstName":["",Validators.required],
      "lastName":["",Validators.required],
      "email":["",Validators.required],
      "password":["",Validators.required],
      "password1":["",Validators.required],
      "password1repeat":["",Validators.required],
    })

  }

  getUserInfo(){
    this.isHidden = false;
    let email = this.localStorageService.getCurrentUser()
    
    if (email) {
      this.userService.GetByMail(email).subscribe(result => {
        if (result.success) {
          this.user = result.data;
        }
      })
    }else {
      this.toastrService.error("Yollunda gitmeyen bir şeyler lütfen tekrar giriş yapın","Hata")
    }
  }

  userUpdate(){
    this.isHidden = true;
    if(this.userForm.valid){
      let user:User = Object.assign({"id":this.user.usersId},this.userForm.value)
      let encoder = new TextEncoder()
      console.log(encoder.encode(this.userForm.value["password1repeat"]));
      
      this.userService.update(user).subscribe(response => {
        if (response.success) {
          this.toastrService.success(response.message,"Başarılı")
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
      })
    }
    
      
  }

}

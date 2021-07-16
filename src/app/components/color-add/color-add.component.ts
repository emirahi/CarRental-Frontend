import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/Entity/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorForm = this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }
  
  Add(){
    console.log(this.colorForm);

    if (this.colorForm.status) {
      //console.log(this.colorForm.value["colorName"]);
      
      let color:Color = {colorId:0,colorName:this.colorForm.value["colorName"]}
      
      this.colorService.add(color).subscribe(Response => {
        if (Response.success){
          this.toastrService.success(Response.message,"Başarılı")
        }else{
          this.toastrService.error(Response.message,"Hata")
        }
      },responseError => {
        console.log(responseError);
        if (responseError.error.Errors.length > 0) {
          let respArray = responseError.error.Errors;
          for (let i = 0; i < respArray.length; i++) {
            let nowArray = respArray[i];
            this.toastrService.error(nowArray.ErrorMessage,"Dikkat")
            
          }
        }
        
      })
    }
  }
}

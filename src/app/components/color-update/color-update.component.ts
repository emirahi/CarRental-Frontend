import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/Entity/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdate:FormGroup;
  colorId:number;
  constructor(private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if(params['colorId']){
        this.updateColorForm(params['colorId'])
      }else{
        window.location.href = "/"
      }
    })
  }

  updateColorForm(colorId:number){
    this.colorId = colorId;
    this.colorService.GetById(colorId).subscribe(Response => {
      let data = Response.data;
      console.log(data);
      
      if (data){
        this.colorUpdate = this.formBuilder.group({
          "colorName":[data.colorName,Validators.required]
        })
      }else{
        window.location.href = "/"
      }

    },errorResponse => {
      window.location.href = "/"
    })
  }

  
  update(){
    if(this.colorId){
      let value = this.colorUpdate.value['colorName']
      let color:Color = {colorId:this.colorId,colorName:value};
      console.log(color);
      
      this.colorService.Update(color).subscribe(Response => {
        if(Response.success){
          this.toastrService.success(Response.message,"Başarılı")
        }
      },errorResponse => {
        console.log(errorResponse);
        
        if (errorResponse.error.Errors.length > 0) {
          let respArray = errorResponse.error.Errors;
          for (let i = 0; i < respArray.length; i++) {
            let nowArray = respArray[i];
            this.toastrService.error(nowArray.ErrorMessage,"Dikkat")
            
          }
        }
      })
    }
  }



}

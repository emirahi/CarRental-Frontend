import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/Entity/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdate:FormGroup;
  brandId:number;
  constructor(private brandService:BrandService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activeRoute:ActivatedRoute) { }
//http://localhost:4200/Brand/Update/1
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      console.log(params['brandId']);
      if(params['brandId']){
        this.updateBrandform(params['brandId'])
      }else{
        window.location.href = "/"
      }
    })
  }

  updateBrandform(brandId:number){
    this.brandId = brandId;
    this.brandService.GetById(brandId).subscribe(Response => {
      let data = Response.data;
      console.log(data);
      
      if (data){
        this.brandUpdate = this.formBuilder.group({
          "brandName":[data.brandName,Validators.required]
        })
      }else{
        window.location.href = "/"
      }

    },errorResponse => {
      window.location.href = "/"
    })
  }

  update(){
    if(this.brandId){
      let value = this.brandUpdate.value['brandName']
      let brand:Brand = {brandId:this.brandId,brandName:value}
      console.log(brand);
      
      this.brandService.Update(brand).subscribe(Response => {
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

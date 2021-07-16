import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/Entity/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandForm();
  }

  createBrandForm(){
    this.brandForm = this.formBuilder.group({
      "brandName":["",Validators.required]
    })
  }

  Add(){
    console.log(this.brandForm)
    if (this.brandForm.status) {
      let brand:Brand = {brandId:0,brandName:this.brandForm.value['brandName']};
      this.brandService.Add(brand).subscribe(response => {
        if (response.success) {
          this.toastrService.success(response.message,"Başarılı")
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

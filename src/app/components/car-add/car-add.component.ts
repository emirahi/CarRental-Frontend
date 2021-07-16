import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validator, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/Entity/brand';
import { Car } from 'src/app/models/Entity/car';
import { Color } from 'src/app/models/Entity/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carForm:FormGroup;
  brandList:Brand[];
  colorList:Color[];

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCarForm();
    this.getBrand();
    this.getColor();
  }

  createCarForm(){
    this.carForm = this.formBuilder.group({
      "brandId":[0,Validators.required],
      "colorId":[0,Validators.required],
      "modelYear":[1990,Validators.required],
      "dailyPrice":[0,Validators.required],
      "descriptions":["",Validators.required],
    })
  }

  // bunu yaparak dry ( dont repeat yourself ) prensibini çiğnemişde olsam bunu ileride refactor ediceğim.
  getBrand(){
    this.brandService.getAll().subscribe(response => {
      if(response.success){
        this.brandList = response.data;
      }
    })
  }

  getColor(){
    this.colorService.getAll().subscribe(response => {
      if (response.success) {
        this.colorList = response.data;
      }
    })
  }

  Add(){
    console.log(this.carForm)
    if (this.carForm.status) {
      let car:Car = {
        brandId:parseInt(this.carForm.value['brandId']),
        colorId:parseInt(this.carForm.value['colorId']),
        dailyPrice:parseInt(this.carForm.value['dailyPrice']),
        descriptions:this.carForm.value['descriptions'],
        modelYear:parseInt(this.carForm.value['modelYear'])
      }
      console.log(car);
      this.carService.Add(car).subscribe(response => {
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
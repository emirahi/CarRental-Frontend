import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validator, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/Entity/brand';
import { Car } from 'src/app/models/Entity/car';
import { Color } from 'src/app/models/Entity/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdate:FormGroup;
  carId:number;
  brandList:Brand[];
  colorList:Color[];
  constructor(private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      if (params['carId']) {
        this.updateCarForm(params['carId']);
      }else {
        window.location.href = "/";
      }
    })
  }

  updateCarForm(carId:number){
    this.carId = carId;
    if(carId > 0){
      this.carService.getCarDetails(carId).subscribe(response => {
        let data = response.data;
        this.carUpdate = this.formBuilder.group({
          "brandId":[data.brandId,Validators.required],
          "colorId":[data.colorId,Validators.required],
          "modelYear":[data.modelYear,Validators.required],
          "dailyPrice":[data.dailyPrice,Validators.required],
          "description":[data.descriptions,Validators.required]
        })
        this.brandService.getAll().subscribe(response => {
          this.brandList = response.data;
        });

        this.colorService.getAll().subscribe(response => {
          this.colorList = response.data;
        })
      });
    }
  }

  update(){
    if(this.carId){
    
      let car:Car = {brandId:this.carUpdate.value['brandId'],colorId:this.carUpdate.value['colorId'],
      dailyPrice:this.carUpdate.value['dailyPrice'],modelYear:this.carUpdate.value['modelYear'],
      descriptions:this.carUpdate.value['description']}
      this.carService.Update(car).subscribe(Response => {
        if(Response.success){
          this.toastrService.success(Response.message,"Başarılı");
        }
      },errorResponse => {

        if (errorResponse.error.Errors.length > 0) {
          let respArray = errorResponse.error.Errors;
          for (let i = 0; i < respArray.length; i++) {
            let nowArray = respArray[i];
            this.toastrService.error(nowArray.ErrorMessage,"Dikkat");
          }
        }

      })
    }
  }

}

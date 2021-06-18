import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/Dto/carDetailDto';
import { CarDto } from 'src/app/models/Dto/cardto';
import { Car } from 'src/app/models/Entity/car';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { BrandComponent } from '../brand/brand.component';
import { ColorComponent } from '../color/color.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  carsDto: CarDto[] = [];
  carDetail:CarDetailDto = {colorId:0,colorName:"",dailyPrice:0,descriptions:"",id:0,modelYear:0,brandId:0,brandName:""};
  isHidden = false
  imageUrl:string = ""
  baseUrl:string = "https://localhost:44350/"

  constructor(private carService: CarService, private colorComponent: ColorComponent
    ,private brandComponent: BrandComponent,private carImageService:CarImageService
    ,private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    localStorage.setItem("brand","0")
    localStorage.setItem("color","0")
    
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetails(params["carId"]);
        this.isHidden = true
      }
      else {
        this.getAllCarDto();
        this.isHidden = false
      }
    })

    /*
    brand ve color a localstore i kullanarak o andaki değeri ( option'ı ) globale taşıdım diğer bir altarnetif ise global
    bir class yapıp oraya set edebilirdim.
    */


  }

  getAllCar() {
    this.carService.getAllCar().subscribe(Response => {
      this.cars = Response.data;
    })

  }

  getAllCarDto() {
    this.carService.getAllCarDto().subscribe(Response => {
      this.carsDto = Response.data;
    })
  }

  getCarByColor(colorId: number) {
    this.carService.getCarByColor(colorId).subscribe(item => {
      this.carsDto = item.data;
    })
  }

  getCarByBrand(brandId: number) {
    this.carService.getCarByBrand(brandId).subscribe(item => {
      this.carsDto = item.data;
    })
  }

  getCarDetails(carId:number) {
    this.carService.getCarDetails(carId).subscribe(item => {
      this.carDetail = item.data;
      console.log(item.data)
      this.carImageService.getCarById(carId).subscribe(response => {

        if(response.data.length == 1){
          let path = response.data[0].imagePath.split("\\");
          this.imageUrl = this.baseUrl + path[path.length-2] + "/" + path[path.length-1];
        }
        else{
          this.imageUrl = "assets/img/carDefault.jpg"
        }
        
        
      })
      
    })
  }

  searchTheCar() {
    let brandIdTemp = localStorage.getItem("brand")
    let colorIdTemp = localStorage.getItem("color")

    if (brandIdTemp?.trim() === "0" && colorIdTemp?.trim() === "0") {
      this.getAllCarDto();
    }
    else if (brandIdTemp != undefined && brandIdTemp != null && colorIdTemp != undefined && colorIdTemp != null) {

      let brandId = parseInt(brandIdTemp)
      let colorId = parseInt(colorIdTemp)

      if (brandId != 0 && colorId != 0) {
        this.carService.getSearch(brandId, colorId).subscribe(item => {
          this.carsDto = item.data;
        })
      }
      else if (brandId == 0 || colorId == null && colorId != 0) {
        this.getCarByColor(colorId);
      }
      else if (colorId == 0 || colorId == null && brandId != 0) {
        this.getCarByBrand(brandId);
      }
      else {
        this.getAllCarDto();
      }
    }
  }

}


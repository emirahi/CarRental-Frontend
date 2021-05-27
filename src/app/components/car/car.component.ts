import { Component, OnInit } from '@angular/core';
import { CarbyBrandDto } from 'src/app/models/Dto/carbybranddto';
import { CarbyColorDto } from 'src/app/models/Dto/carbycolordto';
import { CarDto } from 'src/app/models/Dto/cardto';
import { Car } from 'src/app/models/Entity/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit { 

  cars:Car[] = [];
  carsDto:CarDto[] = [];
  carBrands:CarbyBrandDto[] = [];
  carColors:CarbyColorDto[] = [];

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getAllCarDto();
    console.log(this.cars);
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

}

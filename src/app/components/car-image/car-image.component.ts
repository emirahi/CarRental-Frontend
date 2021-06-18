import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/Entity/car-image';
import { ListResponseModel } from 'src/app/models/responeModel/listResponseModel';
import { CarImageService } from 'src/app/services/car-image.service';


@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  car:CarImage[] = [];

  constructor(private carImageService:CarImageService) { }

  ngOnInit(): void {
  }

  getCarById(carId:number) {
    this.carImageService.getCarById(carId).subscribe(response => {
      this.car = response.data;
    })
  }

}

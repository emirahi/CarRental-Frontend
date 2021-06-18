import { Component, Injectable, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/Entity/brand';
import { BrandService } from 'src/app/services/brand.service';

@Injectable({
  providedIn : "root"
})
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.brandService.getAll().subscribe(response => {
      this.brands = response.data;
    })
  }

  setCurrentBrand(brand:Brand) {
    localStorage.setItem("brand",brand.brandId.toString());
  }

  setCurrentBrandNull(){
    localStorage.setItem("brand","0");
  }

}

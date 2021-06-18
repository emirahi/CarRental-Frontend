
import { Component, Injectable, OnInit } from '@angular/core';

import { Color } from 'src/app/models/Entity/color';
import { ColorService } from 'src/app/services/color.service';


@Injectable({
  providedIn : "root"
})
@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[] = [];

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.colorService.getAll().subscribe(response => {
      this.colors = response.data;
    })
  }

  setCurrentColor(colorr:Color) {
    localStorage.setItem("color",colorr.colorId.toString());
  }
  setCurrentColorNull(){
    localStorage.setItem("color","0");
  }
}

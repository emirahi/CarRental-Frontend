import { Component, Injectable, OnInit } from '@angular/core';
import { RentalDto } from 'src/app/models/Dto/rentadto';
import { RentalService } from 'src/app/services/rental.service';

@Injectable({
  providedIn:"root"
})
@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:RentalDto[] = []

  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.rentalService.getAll().subscribe(rental => {
      this.rentals = rental.data;
      console.log(rental.data);
      
    })
  }

}

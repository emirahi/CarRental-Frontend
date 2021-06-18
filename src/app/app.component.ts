import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn : "root"
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CarRental-FrontEnd';
}

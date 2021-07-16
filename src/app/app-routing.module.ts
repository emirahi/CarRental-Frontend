import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"Car",pathMatch:"full",component:CarComponent},
  {path:"CarDetail/:carId",component:CarComponent},
  {path:"Payment/:carId",component:PaymentComponent},

  {path:"Brand",component:BrandComponent},
  {path:"Color",component:ColorComponent},
  {path:"Rental",component:RentalComponent},
  
  {path:"Car/Add",component:CarAddComponent},
  {path:"Brand/Add",component:BrandAddComponent},
  {path:"Color/Add",component:ColorAddComponent},

  {path:"Car/Update/:carId",component:CarUpdateComponent},
  {path:"Brand/Update/:brandId",component:BrandUpdateComponent},
  {path:"Color/Update/:colorId",component:ColorUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


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
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"Car",pathMatch:"full",component:CarComponent},
  {path:"CarDetail/:carId",component:CarComponent,canActivate:[LoginGuard]},
  {path:"Payment/:carId",component:PaymentComponent,canActivate:[LoginGuard]},
  {path:"user",component:UserComponent},

  {path:"Brand",component:BrandComponent},
  {path:"Color",component:ColorComponent},
  {path:"Rental",component:RentalComponent},
  
  {path:"Car/Add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"Brand/Add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"Color/Add",component:ColorAddComponent,canActivate:[LoginGuard]},

  {path:"Car/Update/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"Brand/Update/:brandId",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"Color/Update/:colorId",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


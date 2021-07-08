import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { card } from 'src/app/models/Entity/card';
import { Rental } from 'src/app/models/Entity/rental';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cardName:string = "";
  cardNumber:string = "";
  cardExp:string = "";
  cardCvv:string = "";
  tryCount = 0;

  constructor(private paymentService:PaymentService,private rentalService:RentalService
             ,private toastrService:ToastrService) { }

  ngOnInit(): void {
    if (!document.referrer) {
      window.location.href = "/"
    }
  }

  validPayment(){
    this.tryCount += 1;
    if (this.tryCount === 3) {
      this.toastrService.error("3 defa denediniz ödeme başarısız","başarısız")
      setTimeout(() => {
        window.location.href = "/"
      }, 1500);
    }
    console.log(this.cardName.length);
    console.log(this.cardNumber.length);
    console.log(this.cardExp.length);
    console.log(this.cardCvv.length);

    let Card:card = {ıd:0,userId:0,fullName:this.cardName,creditCard:this.cardNumber,ExpiryDate:this.cardExp,cvv:this.cardCvv}
    this.paymentService.IsSuccessCard(Card).subscribe(Response => {

      if (Response.success){

        let carInfo = localStorage.getItem("carInfo");
        if(carInfo){
          let rentalObj = carInfo.split(",");
          let rental:Rental = {carId:parseInt(rentalObj[0]),customerId:parseInt(rentalObj[1]),rentDate:rentalObj[2],returnDate:rentalObj[3]};

          this.rentalService.add(rental);
          this.toastrService.success("İşlem Başarılı","Başarılı")
          setTimeout(() => {
            window.location.href = document.referrer;    
          }, 1500);
        }
      }


      
    })
  }

}

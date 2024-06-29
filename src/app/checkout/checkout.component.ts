import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private _CartService:CartService)
  {}
  
  cartDetails:any =null;
    // get product from cart
    ngOnInit(): void {
      this._CartService.getLoggedUserCart().subscribe({
        next:(response)=>{
          this.cartDetails = response.data ;
          console.log(response.data)
        },
        error:(err)=>console.log(err)
      })
    }
  
  
  shipppingAddress:FormGroup = new FormGroup ({
  
    details : new FormControl(null), 
    phone : new FormControl(null),
    city : new FormControl(null),
  });
  
  navigateToPage(url:string)
  {
    window.location.href= url;
  }
  
  
  handleSubmit(shipppingAddress:FormGroup)
  {
    this._CartService.onlinePayment(shipppingAddress.value ,"665f0dbcc20c3e03445c56ba" ).subscribe({
      next:(response:any)=> {
        this.navigateToPage(response.session.url)
          console.log(response.session.url);
      } , 
      error:(err)=>
        {
          console.log(err)
        }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cartDetails:any =null;
  constructor(private _CartService:CartService )
  {}

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill('fas fa-star rating-color'),
      ...Array(halfStar).fill('fas fa-star-half-alt rating-color'),
      ...Array(emptyStars).fill('far fa-star')
    ];
  }

  // update the count of the cart product

  updateItemCount(productid:string , Count:number)
  {
    this._CartService.updateItemCount(productid , Count).subscribe({
      next:(response)=>{
        this.cartDetails =response.data;
        console.log(response.data)
      },

      error:(err)=>console.log(err)
    })
    
  }

  // remove item form cart
  removeItem(productid:string)
  {
      this._CartService.removeCartItem(productid).subscribe({
        next:(response)=>{
          this.cartDetails =response.data;
          this._CartService.numberOfCartItem.next(response.numOfCartItems)
          console.log(response.data)
        },
  
        error:(err)=>console.log(err)
      })
  }


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
}

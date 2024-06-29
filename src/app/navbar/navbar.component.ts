import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  cartNumbers :number = 0;
  listNumbers :number = 0;
  isLogin : boolean = false; 
  logout()
  {
    this._AuthService.logOut();
  }


  constructor ( private _AuthService :AuthService , private _CartService:CartService , private _WishlistService:WishlistService)
  {

    _CartService.numberOfCartItem.subscribe({
      next:(x)=>this.cartNumbers = x
    })

    _WishlistService.numberOfListItem.subscribe({
      next:(y)=>this.listNumbers=y
    })

      _AuthService.userData.subscribe({
        next:()=>
          {
            if (_AuthService.userData.getValue()!==null)
              {
                this.isLogin = true
              }
              else 
              {
                this.isLogin = false
              }
          }
      })
  }


}

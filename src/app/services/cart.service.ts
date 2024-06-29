import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numberOfCartItem = new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient)
   {
    this.getLoggedUserCart().subscribe({
      next: (response) =>
        {
          this.numberOfCartItem.next(response.numOfCartItems)
          console.log(response)
        },
        error:(err)=>console.log(err)
    })
   }

   headers:any ={
    token :localStorage.getItem('userToken')
  }
  
  addToCart(productid:string):Observable<any>
  {
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {productId:productid } ,
    {
      headers:this.headers
    })
  
  }

//number of items
  getLoggedUserCart():Observable<any>
{
return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,

  {
    headers:this.headers
  })

}


removeCartItem(productid:string):Observable<any>
{
return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,

  {
    headers:this.headers
  })

}


updateItemCount(productid:string , Count:number):Observable<any>
{
return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
  {
    count :Count
  },

  {
    headers:this.headers
  })

}

// online Payment

onlinePayment(shipppingAddress:any , cartId:string)
{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      shipppingAddress:shipppingAddress
    },
  
    {
      headers:this.headers
    })
}
}


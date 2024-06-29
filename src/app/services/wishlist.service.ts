import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  numberOfListItem = new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient )
    {
        this.getLoggedUserlist().subscribe({
          next:(response)=>{
            this.numberOfListItem.next(response.count)
            console.log(response)
          },
          error:(error)=>console.log(error)
        })
    }


  headers:any ={
    token :localStorage.getItem('userToken')
  }
  
  addToList(productid:string):Observable<any>
  {
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {productId:productid } ,
    {
      headers:this.headers
    })
  
  }

  removeFromList(productid:string):Observable<any>
{
return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productid}`,

  {
    headers:this.headers
  })

}

getLoggedUserlist():Observable<any>
{
return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,

  {
    headers:this.headers
  })

}



}
 
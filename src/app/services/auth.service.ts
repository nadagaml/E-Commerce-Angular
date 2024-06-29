import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient , private _Router:Router) 
  {
     if(localStorage.getItem('userToken')!==null )
        {
          this.decodeUserData()
        }
  }


  decodeUserData()
{
  let encodedToken = JSON.stringify( localStorage.getItem('userToken') )

   let decodedToken :any =  jwtDecode(encodedToken)
   console.log(decodedToken)
   this.userData.next(decodedToken)
}

logOut()
{
  localStorage.removeItem ('userToken');
  this.userData.next(null);
  this._Router.navigate(['/login'])
  //navigate to login



}

register(userData:object) : Observable <any>
{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , userData)
}

  login(userData:object) : Observable <any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , userData)
  
  }
}

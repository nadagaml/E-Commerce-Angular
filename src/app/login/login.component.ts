import { Component } from '@angular/core';
import { FormGroup ,FormControl ,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private _AuthService : AuthService , private _Router:Router)
  {}

  isloading:boolean = false;
  apiError :string = '';
  loginForm : FormGroup =new FormGroup({
  
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null  , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)])
  
  });

  
  handelLogin(loginForm:FormGroup)
  {
    this.isloading = true;
    if(loginForm.valid)
      {
        this._AuthService.login(loginForm.value).subscribe({
          next:(response)=>
            {
              if (response.message === 'success')
                {
                  localStorage.setItem('userToken', response.token)
                  
                  this._AuthService.decodeUserData()
                  this.isloading = false;
                  console.log('Navigating to home...');
                  this._Router.navigate(['/home'])
                   //navigaton home
                  
                }
            },
          error:(err) => 
            {
            this.isloading = false;

            this.apiError = err.errors
             console.log('Error:', err);
          //this.apiError = err.errors ? err.errors : 'An unexpected error occurred';
          
            }
        })

      }
      console.log('Navigating to non...');
     console.log(loginForm);
  }





}

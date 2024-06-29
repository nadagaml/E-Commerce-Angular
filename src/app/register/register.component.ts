import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router)
  {
    if (localStorage.getItem('userToken')!==null)
      {
        _Router.navigate(['/home'])
      } 
  }
  
  isloading:boolean = false;
  apiError :string = '';
  registerForm : FormGroup =new FormGroup({
    name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null  , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    rePassword: new FormControl(null  , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/) ]),

  } , {validators: this.rePasswordMatch});



  rePasswordMatch(registerForm:any)
  {
    let passwordControl = registerForm.get('password');
    let rePasswordControl = registerForm.get('rePassword');

    if(passwordControl.value === rePasswordControl.value)
      {
        return null;
      }
      else
      {
        rePasswordControl.setErrors({passwordmatch : 'password and rePassword not matched'})
        return {passwordmatch : 'password and rePassword not matched'}
      }
  }

  handelRegister(registerForm:FormGroup)
  {
    this.isloading = true;
    if(registerForm.valid)
      {
        this._AuthService.register(registerForm.value).subscribe({
          next:(response)=>
            {
              if (response.message === 'success')
                {
                  this.isloading = false;
                  this._Router.navigate(['/login'])
                   //navigaton login
                  
                }
            },
          error:(err) => 
            {
            this.isloading = false;
             console.log('Error:', err);
            this.apiError = err.errors
            
            }
        })
      }
    console.log(registerForm);
  }

}

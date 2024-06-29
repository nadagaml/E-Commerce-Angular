import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ProductdetailesComponent } from './productdetailes/productdetailes.component';
import { MainsliderComponent } from './mainslider/mainslider.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { SpinnerComponent } from './spinner/spinner.component';


import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FeaturedproductComponent } from './featuredproduct/featuredproduct.component';
import { SearchPipe } from './search.pipe';
import { WishlistComponent } from './wishlist/wishlist.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    CheckoutComponent,
    HomeComponent,
    ProductdetailesComponent,
    MainsliderComponent,
    CategoriesComponent,
    CartComponent,
    SpinnerComponent,
    FeaturedproductComponent,
    SearchPipe,
    WishlistComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

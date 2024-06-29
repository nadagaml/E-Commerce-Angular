import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';
import { ProductdetailesComponent } from './productdetailes/productdetailes.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [

  {path:'' , redirectTo:'home' , pathMatch:'full'}, 
  {path:'home',component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'categories' , canActivate:[AuthGuard] , component:CategoriesComponent},
  {path:'cart', canActivate:[AuthGuard]  ,  component:CartComponent},
  {path:'wishlist', canActivate:[AuthGuard]  ,  component:WishlistComponent},
  {path:'productdetailes/:id', canActivate:[AuthGuard]  ,  component:ProductdetailesComponent},
  {path:'checkout', canActivate:[AuthGuard]  ,  component:CheckoutComponent},
  {path:'**' , component:NotFoundComponent},






  // {path:'featuredproduct' ,component:FeaturedproductComponent},
  // {path:'about', component:AboutComponent}, 
  

  // {path:'settings' , loadChildren:()=> import('./settings/settings.module').then((m)=>m.SettingsModule)},
  // { path: 'onsale', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

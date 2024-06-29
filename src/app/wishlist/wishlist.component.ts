import { Component ,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor ( private _ProductService:ProductService ,
  private toastr:ToastrService,
private _WishlistService:WishlistService)
  {
  }
    
  loading:boolean = false
  listDetails:any =null;

  
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
   //remove form wish list
   removeFromWishList(productId: string, productTitle: string) {
    this.loading = true;
    this._WishlistService.removeFromList(productId).subscribe({
      next: (response) => {
        this.listDetails = response.data ;
        this.toastr.success(`${productTitle} has been removed from your list!`, 'Success');
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false; // Setting loading to false after the operation completes, regardless of success or error
      }
    });
  }
    
  // get product from cart
  ngOnInit(): void {
    this._WishlistService.getLoggedUserlist().subscribe({
      next:(response)=>{
        this.listDetails = response.data ;
        console.log(response.data)
      },
      error:(err)=>console.log(err)
    })
  }
 

 

}

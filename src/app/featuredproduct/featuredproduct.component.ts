import { Component ,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from './../interfaces/product';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../services/wishlist.service';




@Component({
  selector: 'app-featuredproduct',
  templateUrl: './featuredproduct.component.html',
  styleUrls: ['./featuredproduct.component.css']
})
export class FeaturedproductComponent {
  constructor ( private _ProductService:ProductService ,
    private _CartService:CartService ,
    private toastr:ToastrService,
    private _WishlistService:WishlistService)
  {
  }


   
  loading:boolean = false


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

  
  products:Product[]=[];
  searchTrem:string= '';

  ngOnInit(): void {
    this.loading = true
    this._ProductService.getProducts().subscribe({
      // next:(response)=> this.products = response.data,
      next: (response) => {
        this.products = response.data;
        console.log(this.products); // Log the products to the console
        this.loading=false
      },
      
  
      
    })
    this.loadWishlistFromLocalStorage();
   
  }

  // add to cart

  addToCart(productId:string , productTitle: string)
{
  this.loading = true
  this._CartService.addToCart(productId).subscribe({
    next:(response)=> 
    {
      this._CartService.numberOfCartItem.next(response.numOfCartItems)
      this.toastr.success(`${productTitle} has been added to your cart!`, 'Success');
      console.log(response)
      
    },
    error:(err)=>
      {console.log(err) 
      
      },
      complete: () => {
        this.loading = false; // Setting loading to false after the operation completes, regardless of success or error
      }
  })
}

wishlist: Set<string> = new Set<string>();
loadWishlistFromLocalStorage() {
  const savedWishlist = localStorage.getItem('wishlist');
  if (savedWishlist) {
    this.wishlist = new Set<string>(JSON.parse(savedWishlist));
  }
}

saveWishlistToLocalStorage() {
  localStorage.setItem('wishlist', JSON.stringify(Array.from(this.wishlist)));
}

toggleWishList(productId: string, productTitle: string) {
  if (this.isInWishlist(productId)) {
    this.removeFromWishList(productId, productTitle);
  } else {
    this.addToWishList(productId, productTitle);
  }
}

addToWishList(productId: string, productTitle: string) {
  this.loading = true;
  this._WishlistService.addToList(productId).subscribe({
    next: (response) => {
      this.wishlist.add(productId);
      this._WishlistService.numberOfListItem.next(response.count)
      this.saveWishlistToLocalStorage();
      this.toastr.success(`${productTitle} has been added to your list!`, 'Success');
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

removeFromWishList(productId: string, productTitle: string) {
  this.loading = true;
  this._WishlistService.removeFromList(productId).subscribe({
    next: (response) => {
      this.wishlist.delete(productId);
      this.saveWishlistToLocalStorage();
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

isInWishlist(productId: string): boolean {
  return this.wishlist.has(productId);
}



// addToWishList(productId:string , productTitle: string)
// {
//   this.loading = true
//   this._WishlistService.addToList(productId).subscribe({
//     next:(response)=> 
//     {
//       //this._WishlistService.numberOfCartItem.next(response.numOfCartItems)
//       this.toastr.success(`${productTitle} has been added to your list!`, 'Success');
//       console.log(response)
      
//     },
//     error:(err)=>
//       {console.log(err) 
      
//       },
//       complete: () => {
//         this.loading = false; // Setting loading to false after the operation completes, regardless of success or error
//       }
//   })
// }

}

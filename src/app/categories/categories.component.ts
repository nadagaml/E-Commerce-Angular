import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component , OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  constructor(private _ProductService:ProductService)
  {
  
  }
  
  categor:any[]= [];
  
  ngOnInit() :void
  {
  this._ProductService.getCategories().subscribe({
    next:(response)=>this.categor = response.data
  })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      },
      
    },
        nav: true,
    autoplay: true,
    autoplayTimeout: 3000, // Change slide every 3 seconds
    autoplayHoverPause: true // Pause on mouse hover
  }

  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     600: {
  //       items: 2
  //     },
  //     1000: {
  //       items: 3
  //     }
  //   },
  //   nav: true,
  //   autoplay: true,
  //   autoplayTimeout: 3000, // Change slide every 3 seconds
  //   autoplayHoverPause: true // Pause on mouse hover
  // };

  // categories = [
  //   { name: 'Fresh Fruit', image: 'assets/img/categories/cat-1.jpg' },
  //   { name: 'Dried Fruit', image: 'assets/img/categories/cat-2.jpg' },
  //   { name: 'Vegetables', image: 'assets/img/categories/cat-3.jpg' },
  //   { name: 'Drink Fruits', image: 'assets/img/categories/cat-4.jpg' },
  //   // Add more categories as needed
  // ];

  
}

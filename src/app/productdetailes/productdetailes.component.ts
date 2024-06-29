import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-productdetailes',
  templateUrl: './productdetailes.component.html',
  styleUrls: ['./productdetailes.component.css']
})
export class ProductdetailesComponent implements OnInit{

  constructor (private _ActivatedRoute:ActivatedRoute ,
    private _ProductService:ProductService ,
    private _CartService:CartService ,
  private toastr:ToastrService)
  {

  }

  loading:boolean = false

  productDetails:any
  productId :any;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe ((params)=>
    {
      this.productId = params.get('id')
    });

    this._ProductService.getProductsDetails(this.productId).subscribe({
      next:(response)=> this.productDetails = response.data
    })

  }
  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
      
  //   },
  //   nav: true
  // }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000, // Change slide every 3 seconds
    autoplayHoverPause: true // Pause on mouse hover
  };
}
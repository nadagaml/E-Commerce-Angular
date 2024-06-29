import { Category } from "./category";

export interface Product {
    _id:string,
    title:string,
    category:Category,
    price:string,
    ratingsAverage:number
    imageCover:string
}

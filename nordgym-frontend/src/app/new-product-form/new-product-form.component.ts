import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.css']
})
export class NewProductFormComponent {

  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { 
    this.product = new Product();
  }

  onSubmit() {
    this.productService.save(this.product).subscribe(result => this.goToProductList())
  }

  goToProductList() {
    this.router.navigate(['product/all']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.css']
})
export class NewProductFormComponent {

  product: Product;
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.product = new Product();

    this.productForm = new FormGroup({
      productName: new FormControl(this.product.name, [
        Validators.required,
        Validators.pattern('^[A-Za-z ]{2,50}')
      ]),
      productPrice: new FormControl(this.product.price, [
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')
        // Validators.pattern('^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$') // why is this not working here?!
      ]),
    });
  }

  get productName() {
    return this.productForm.get('productName');
  }

  get productPrice() {
    return this.productForm.get('productPrice');
  }

  onSubmit() {
    this.productService.save(this.product).subscribe(() => this.goToProductList());
  }

  goToProductList() {
    this.router.navigate(['product/all']);
  }
}

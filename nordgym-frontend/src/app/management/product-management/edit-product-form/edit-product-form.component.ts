import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../service/product.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.css']
})
export class EditProductFormComponent implements OnInit {

  product: Product;
  productToUpdate: number;
  statusCode: number;
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
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

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.loadProduct(productId);
  }

  loadProduct(id: string) {
    this.productService.getProductById(id)
      .subscribe(prdct => {
        this.productToUpdate = prdct.id;
        this.productForm.setValue({productName: prdct.name, productPrice: prdct.price});
      });
  }

  onEdit() {
    this.preProcessConfigurations();
    this.product.id = +this.route.snapshot.paramMap.get('id');
    this.productService.updateProduct(this.product).subscribe(() => {
      this.statusCode = 200;
      this.goToProductList();
    }, errorCode => this.statusCode = errorCode);
  }

  goToProductList() {
    this.router.navigate(['product/all']);
  }

  get productName() {
    return this.productForm.get('productName');
  }

  get productPrice() {
    return this.productForm.get('productPrice');
  }

  preProcessConfigurations() {
    this.statusCode = null;
  }
}

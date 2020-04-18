import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  products: MatTableDataSource<Product>;
  tableColumns: string[] = ['id', 'name', 'price', 'edit', 'delete'];

  constructor(  private router: Router,
                private productService: ProductService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.products = new MatTableDataSource(data);
      this.products.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }


  deleteProduct(productId: string) {

    this.productService.delete(productId)
      .subscribe();
    this.products.data = this.products.data.filter((value, key) => {
      return value.id !== +productId;
    });
  }
}

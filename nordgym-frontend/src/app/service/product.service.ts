import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Product } from '../model/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsUrl: string;

  constructor(private http: HttpClient) {
    this.productsUrl = 'http://localhost:8080/product/all';
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

}

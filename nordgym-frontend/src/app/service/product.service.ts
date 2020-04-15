import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Product } from '../model/product'
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsUrl: string;
  saveUrl: string;
  deleteUrl: string;

  constructor(private http: HttpClient) {
    this.productsUrl = 'http://localhost:8080/product/all';
    this.saveUrl = 'http://localhost:8080/product/save';
    this.deleteUrl = 'http://localhost:8080/product/delete';
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  save(product: Product) {
    return this.http.post<Product>(this.saveUrl, product);
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(this.deleteUrl);
  }
}

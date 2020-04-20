import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Product} from '../model/product';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsUrl: string;
  productById: string;
  productUpdate: string;
  saveUrl: string;
  deleteUrl: string;

  constructor(private http: HttpClient) {
    this.productsUrl = 'http://localhost:8080/product/all';
    this.productById = 'http://localhost:8080/product/';
    this.productUpdate = 'http://localhost:8080/product/update/';
    this.saveUrl = 'http://localhost:8080/product/save';
    this.deleteUrl = 'http://localhost:8080/product/delete/';
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(this.productById + productId).pipe(
      tap(p => console.log('Product ID: ' + p.id + ' ; Product Name: ' + p.name + ' ; Product price: ' + p.price)),
      catchError(this.handleError));
  }

  save(product: Product) {
    return this.http.post<Product>(this.saveUrl, product);
  }

  updateProduct(product: Product): Observable<number> {
    let httpHeaders: HttpHeaders;
    const productId = product.id;
    httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Product>(this.productUpdate + productId, product, {
        headers: httpHeaders,
        observe: 'response'
      }
    ).pipe(
      map(res => res.status),
      catchError(this.handleError)
    );
  }

  delete(productId: string): Observable<number> {
    return this.http.delete<number>(this.deleteUrl + productId).pipe(
      tap(status => console.log('status: ' + status)));
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}

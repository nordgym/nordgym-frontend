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
  saveUrl: string;
  deleteUrl: string;

  constructor(private http: HttpClient) {
    this.productsUrl = 'http://localhost:8080/product/all';
    this.productById = 'http://localhost:8080/'
    this.saveUrl = 'http://localhost:8080/product/save';
    this.deleteUrl = 'http://localhost:8080/product/delete/';
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(this.productById + productId).pipe(
      tap(p => console.log(p.id + ' ' + p.name + ' ' + p.price)));
  }

  save(product: Product) {
    return this.http.post<Product>(this.saveUrl, product);
  }

  updateProduct(product: Product): Observable<number> {
    let httpHeaders: HttpHeaders;
    httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Product>(this.productById + product.id, product, {
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

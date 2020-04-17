import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from './order';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + '/all');
  }

  save(order: Order) {
    return this.http.post(this.baseUrl + '/save', order);
  }

  getAllOpen(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + '/open');
  }

  complete(id: number) {
    return this.http.patch(this.baseUrl + '/complete', id);
  }

  getAllByUserId(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + `/all/user/id?id=${id}`);
  }
}


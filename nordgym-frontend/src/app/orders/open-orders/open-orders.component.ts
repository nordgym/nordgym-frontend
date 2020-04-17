import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../order';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.css']
})
export class OpenOrdersComponent implements OnInit {
  panelOpenState = false;
  openOrders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.openOrders$ = this.orderService.getAllOpen();
  }

  getTotalCost(order: Order): number {
    const totalCostProducts = order.products.length ?
      order.products.map(p => p.price).reduce((acc, value) => acc + value, 0) : 0;
    const totalCostMemberships = order.memberships.length ?
      order.memberships.map(m => m.price).reduce((acc, value) => acc + value, 0) : 0;
    return totalCostProducts + totalCostMemberships;
  }

  complete(id: number) {
    this.orderService.complete(id).subscribe();
    window.location.reload();
  }
}

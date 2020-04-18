import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../order';
import {OrderService} from '../order.service';
import {delay, map} from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  panelOpenState = false;
  @Input() orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
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

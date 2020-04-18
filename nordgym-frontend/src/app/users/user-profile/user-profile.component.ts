import {Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {User} from '../user';
import {UserService} from '../user.service';
import {Observable} from 'rxjs';
import {Order} from '../../orders/order';
import {OrderService} from '../../orders/order.service';
import {MembershipService} from '../../memberships/membership.service';
import {Membership} from '../../memberships/membership';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  orders$: Observable<Order[]>;
  @Output() memberships: Membership[];

  constructor(
    private userService: UserService,
    private membershipService: MembershipService,
    private orderService: OrderService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.user$ = this.userService.getById(id);
      this.orders$ = this.orderService.getAllByUserId(id).pipe(
        map(data => this.makeOpenOrdersOnTop(data)),
        tap(data => this.memberships = this.getUserMembershipsFromOrders(data)));
    });
  }

  ngOnDestroy(): void {
  }

  makeOpenOrdersOnTop(orders: Order[]): Order[] {
    const completeOrders = [];
    const openOrders = [];
    orders.forEach(order => {
      order.isOpen ? openOrders.push(order) : completeOrders.push(order);
    });
    return openOrders.concat(completeOrders);
  }

  getUserMembershipsFromOrders(orders: Order[]): Membership[] {
    let memberships: Membership[] = [];
    orders.forEach(order => {
      memberships = memberships.concat(order.memberships);
    });
    return memberships;
  }

  formatMembershipsStartEndEndDate(memberships: Membership[]) {
  }
}

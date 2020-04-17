import {Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {User} from '../user';
import {UserService} from '../user.service';
import {Observable, Subscription} from 'rxjs';
import {Order} from '../../orders/order';
import {OrderService} from '../../orders/order.service';
import {MatTableDataSource} from '@angular/material/table';
import {Membership} from '../../memberships/membership';
import {MatSort} from '@angular/material/sort';
import {MembershipService} from '../../memberships/membership.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() sortMemberships = this.sort;
  memberships: MatTableDataSource<Membership>;
  subscription$: Subscription;
  user$: Observable<User>;
  orders$: Observable<Order[]>;

  constructor(
    private userService: UserService,
    private membershipService: MembershipService,
    private orderService: OrderService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription$ = this.membershipService.getAll().subscribe(data => {
        this.memberships = new MatTableDataSource(data);
        this.memberships.sort = this.sort;
      }
    );
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.user$ = this.userService.getById(id);
      this.orders$ = this.orderService.getAllByUserId(id).pipe(
        map(data => this.makeOpenOrdersOnTop(data)));
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  makeOpenOrdersOnTop(orders: Order[]): Order[] {
    const completeOrders = [];
    const openOrders = [];
    orders.forEach(order => {
      order.isOpen ? openOrders.push(order) : completeOrders.push(order);
    });
    return openOrders.concat(completeOrders);
  }
}

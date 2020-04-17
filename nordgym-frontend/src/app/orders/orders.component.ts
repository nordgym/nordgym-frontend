import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../products/product';
import {ProductService} from '../products/product.service';
import {Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {User} from '../users/user';
import {UserService} from '../users/user.service';
import {Order} from './order';
import {OrderService} from './order.service';
import {Membership} from '../memberships/membership';
import {MembershipService} from '../memberships/membership.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @Output() openOrders$: Observable<Order[]>;
  products: Product[] = [];
  memberships: Membership[] = [];
  order: Order = new Order();
  userOptions: Observable<User[]>;
  userControl = new FormControl();
  productControl = new FormControl();
  membershipControl = new FormControl();
  filteredOptions: Observable<User[]>;
  displayedColumns = ['name', 'price', 'decrement', 'count', 'increment'];
  selectedProducts: Product[] = [];
  selectedMemberships: Membership[] = [];

  constructor(private productService: ProductService, private userService: UserService,
              private orderService: OrderService, private membershipService: MembershipService) {
  }

  ngOnInit() {
    this.productService.getAll().subscribe(data => {
      this.products = data.sort((p1, p2) => p1.name.localeCompare(p2.name));
    });
    this.membershipService.getAll().subscribe(data => {
      this.memberships = data.sort((m1, m2) => m1.name.localeCompare(m2.name));
    });
    this.userOptions = this.userService.getAll();

    this.filteredOptions = this.userControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this._filter(value))
      );
    this.openOrders$ = this.orderService.getAllOpen();
  }

  private _filter(value: string | User) {
    let filterValue = '';
    if (value) {
      filterValue = typeof value === 'string' ? value.toLowerCase() : value.firstName + ' ' + value.lastName.toLowerCase();
      return this.userOptions.pipe(
        map(users => users.filter(user =>
          user.firstName.toLowerCase().includes(filterValue) ||
          user.lastName.toLowerCase().includes(filterValue) ||
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(filterValue)
          )
        )
      );
    } else {
      return this.userOptions;
    }
  }

  getTotalCost() {
    const totalCostProducts = this.order.products.length ?
      this.order.products.map(p => p.price).reduce((acc, value) => acc + value, 0) : 0;
    const totalCostMemberships = this.order.memberships.length ?
      this.order.memberships.map(m => m.price).reduce((acc, value) => acc + value, 0) : 0;
    return totalCostProducts + totalCostMemberships;
  }

  getSelectedProducts(selectedProducts: Product[]) {
    this.order.products = [];
    selectedProducts.forEach(p => {
      const product = new Product();
      product.id = p.id;
      product.name = p.name;
      product.price = p.price;
      this.order.products.push(product);
    });
  }

  getSelectedUser(user: User) {
    this.order.user = user;
  }

  displayFn(user?: User): string | undefined {
    return user ? user.firstName + ' ' + user.lastName : undefined;
  }

  decrementCounter(orderedItem: Product | Membership) {
    let originalPrice = 0;
    if (orderedItem instanceof Product) {
      originalPrice = this.products.find(product => product.id === orderedItem.id).price;
      if (orderedItem.price >= originalPrice * 2) {
        orderedItem.price -= originalPrice;
        orderedItem.count--;
      }
    } else {
      originalPrice = this.memberships.find(membership => membership.id === orderedItem.id).price;
      if (orderedItem.price >= originalPrice * 2) {
        orderedItem.price -= originalPrice;
        orderedItem.count--;
      }
    }
  }

  incrementCounter(orderedItem: Product | Membership) {
    if (orderedItem instanceof Product) {
      orderedItem.price += this.products.find(product => product.id === orderedItem.id).price;
    } else {
      orderedItem.price += this.memberships.find(membership => membership.id === orderedItem.id).price;
    }
    orderedItem.count++;
  }

  soldOut() {
    this.orderService.save(this.order).subscribe();
    this.resetOrder();
    window.location.reload();
  }

  getSelectedMemberships(selectedMemberships: Membership[]) {
    this.order.memberships = [];
    selectedMemberships.forEach(m => {
      const membership = new Membership();
      membership.id = m.id;
      membership.name = m.name;
      membership.price = m.price;
      this.order.memberships.push(membership);
    });
  }

  resetOrder() {
    this.selectedProducts = [];
    this.selectedMemberships = [];
    this.userControl.reset();
    this.order.user = new User();
    this.order.products = [];
    this.order.memberships = [];
  }
}

import {User} from '../users/user';
import {Product} from '../products/product';
import {Membership} from '../memberships/membership';

export class Order {
  id: number;
  user: User = new User();
  dateTime: Date;
  isOpen = true;
  products: Product[] = [];
  memberships: Membership[];

  constructor() {
  }

  groupItems(): any[] {
    const items = [];
    this.products.forEach(p => items.push(p));
    this.memberships.forEach(m => items.push(m));
    return items;
  }
}

export class Membership {
  id: number;
  name: string;
  passes: number;
  price: number;
  startDate: Date;
  endDate: Date;
  isActive = this.startDate !== undefined && this.endDate !== undefined;
  count = 1;

  constructor() {
  }
}

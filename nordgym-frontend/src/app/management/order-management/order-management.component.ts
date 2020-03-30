import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  price: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Coffee', price: 1.50, symbol: 'H'},
  {position: 2, name: 'Shake', price: 4.00, symbol: 'He'},
  {position: 3, name: 'Amino', price: 2.00, symbol: 'Li'},
  {position: 4, name: 'Protein bar', price: 9.00, symbol: 'Be'},
  {position: 5, name: 'Tee', price: 1.00, symbol: 'B'},
  {position: 6, name: 'Creatine', price: 12.00, symbol: 'C'},
  {position: 7, name: 'C4', price: 3.00, symbol: 'N'},
  {position: 8, name: 'L-carnitine', price: 15.00, symbol: 'O'},
  {position: 9, name: 'L-glutamine', price: 18.00, symbol: 'F'},
  {position: 10, name: 'Honey', price: 0.50, symbol: 'Ne'},
];

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['select', 'position', 'name', 'price', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}

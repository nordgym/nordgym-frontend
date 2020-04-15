import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {User} from '../model/user';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../service/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['subscriptionNumber', 'firstName', 'lastName', 'delete'];
  users: MatTableDataSource<User>;
  subscription$: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.subscription$ = this.userService.getAll().subscribe(data => {
        this.users = new MatTableDataSource(data);
        this.users.sort = this.sort;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.userService.delete(id).subscribe();
    window.location.reload();
  }
}

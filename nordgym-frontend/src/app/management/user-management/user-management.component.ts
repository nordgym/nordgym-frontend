import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  user: User;
  displayedColumns: string[] = ['subscriptionNumber', 'firstName', 'lastName'];
  users: MatTableDataSource<User>;
  userForm: FormGroup;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = new User();

    this.userForm = new FormGroup({
      subscriptionNumber: new FormControl(this.user.subscriptionNumber, [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]),
      firstName: new FormControl(this.user.firstName, [
        Validators.required,
        Validators.pattern('^[A-Za-z]{2,15}$')
      ]),
      lastName: new FormControl(this.user.lastName, [
        Validators.required,
        Validators.pattern('^[A-Za-z]{2,15}$')
      ]),
    });

    this.userService.getAll().subscribe(data => {
      this.users = new MatTableDataSource(data);
      this.users.sort = this.sort;
    });
  }

  get subscriptionNumber() {
    return this.userForm.get('subscriptionNumber');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  register(data) {
    this.userService.register(data).subscribe();
  }
}

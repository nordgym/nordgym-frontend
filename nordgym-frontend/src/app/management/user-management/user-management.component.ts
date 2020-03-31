import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})

export class UserManagementComponent implements OnInit {
  user: User;
  userForm: FormGroup;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = new User();

    this.userForm = new FormGroup({
      subscriptionNumber: new FormControl(this.user.subscriptionNumber, [
        Validators.required,
        Validators.pattern('^[\\d]{10}$')
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

  register(data) {
    this.userService.register(data).subscribe();
    location.reload();
  }
}

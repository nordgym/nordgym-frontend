import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Membership} from '../../model/membership';
import {MembershipService} from '../../service/membership.service';

@Component({
  selector: 'app-membership-management',
  templateUrl: './membership-management.component.html',
  styleUrls: ['./membership-management.component.css']
})
export class MembershipManagementComponent implements OnInit {
  membershipForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private membershipService: MembershipService) {
  }

  ngOnInit(): void {
    this.membershipForm = this.formBuilder.group({
      name: '',
      passes: '',
      price: ''
    });
  }

  save(membership: Membership) {
    this.membershipService.save(membership).subscribe();
    window.location.reload();
  }
}

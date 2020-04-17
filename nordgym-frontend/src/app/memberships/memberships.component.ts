import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Membership} from './membership';
import {MembershipService} from './membership.service';

@Component({
  selector: 'app-membership-management',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.css']
})
export class MembershipsComponent implements OnInit {
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

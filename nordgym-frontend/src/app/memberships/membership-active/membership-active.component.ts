import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../users/user';
import {Membership} from '../membership';
import {MembershipService} from '../membership.service';

@Component({
  selector: 'app-membership-active',
  templateUrl: './membership-active.component.html',
  styleUrls: ['./membership-active.component.css']
})
export class MembershipActiveComponent implements OnInit {
  @Input() user$: Observable<User>;
  @Input() memberships: Membership[];
  panelOpenState = false;

  constructor(private membershipService: MembershipService) {
  }

  ngOnInit(): void {
  }

  activate(membership: Membership) {
    this.membershipService.activate(membership).subscribe();
    window.location.reload();
  }
}

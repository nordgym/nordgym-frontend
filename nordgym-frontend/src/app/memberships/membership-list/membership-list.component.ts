import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {Membership} from '../membership';
import {MembershipService} from '../membership.service';

@Component({
  selector: 'app-memberships',
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.css']
})
export class MembershipListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['name', 'passes', 'price', 'delete'];
  memberships: MatTableDataSource<Membership>;
  subscription$: Subscription;

  constructor(private membershipService: MembershipService) {
  }

  ngOnInit(): void {
    this.subscription$ = this.membershipService.getAll().subscribe(data => {
        this.memberships = new MatTableDataSource(data);
        this.memberships.sort = this.sort;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  delete(id: number) {
    this.membershipService.delete(id).subscribe();
    window.location.reload();
  }
}

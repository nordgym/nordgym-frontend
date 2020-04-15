import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipManagementComponent } from './membership-management.component';

describe('MembershipManagementComponent', () => {
  let component: MembershipManagementComponent;
  let fixture: ComponentFixture<MembershipManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

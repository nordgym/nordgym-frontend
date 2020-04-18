import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipActiveComponent } from './membership-active.component';

describe('MembershipActiveComponent', () => {
  let component: MembershipActiveComponent;
  let fixture: ComponentFixture<MembershipActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

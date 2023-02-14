import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWaitingListComponent } from './admin-waiting-list.component';

describe('AdminWaitingListComponent', () => {
  let component: AdminWaitingListComponent;
  let fixture: ComponentFixture<AdminWaitingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWaitingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWaitingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

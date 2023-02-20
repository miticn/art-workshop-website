import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkshopWaitingListComponent } from './admin-workshop-waiting-list.component';

describe('AdminWorkshopWaitingListComponent', () => {
  let component: AdminWorkshopWaitingListComponent;
  let fixture: ComponentFixture<AdminWorkshopWaitingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWorkshopWaitingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWorkshopWaitingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

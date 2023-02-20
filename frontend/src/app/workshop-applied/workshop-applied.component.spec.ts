import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopAppliedComponent } from './workshop-applied.component';

describe('WorkshopAppliedComponent', () => {
  let component: WorkshopAppliedComponent;
  let fixture: ComponentFixture<WorkshopAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopAppliedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

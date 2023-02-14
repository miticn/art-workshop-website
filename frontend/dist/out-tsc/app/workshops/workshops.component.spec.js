import { TestBed } from '@angular/core/testing';
import { WorkshopsComponent } from './workshops.component';
describe('WorkshopsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkshopsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(WorkshopsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=workshops.component.spec.js.map
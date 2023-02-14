import { TestBed } from '@angular/core/testing';
import { OrgComponent } from './org.component';
describe('OrgComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrgComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(OrgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=org.component.spec.js.map
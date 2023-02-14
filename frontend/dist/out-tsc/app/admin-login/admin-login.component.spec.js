import { TestBed } from '@angular/core/testing';
import { AdminLoginComponent } from './admin-login.component';
describe('AdminLoginComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdminLoginComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AdminLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=admin-login.component.spec.js.map
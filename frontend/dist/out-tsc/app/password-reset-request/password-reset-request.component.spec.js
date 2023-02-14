import { TestBed } from '@angular/core/testing';
import { PasswordResetRequestComponent } from './password-reset-request.component';
describe('PasswordResetRequestComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PasswordResetRequestComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PasswordResetRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=password-reset-request.component.spec.js.map
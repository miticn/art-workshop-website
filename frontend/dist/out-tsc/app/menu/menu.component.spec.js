import { TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
describe('MenuComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenuComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=menu.component.spec.js.map
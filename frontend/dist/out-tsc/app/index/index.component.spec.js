import { TestBed } from '@angular/core/testing';
import { IndexComponent } from './index.component';
describe('IndexComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IndexComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(IndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=index.component.spec.js.map
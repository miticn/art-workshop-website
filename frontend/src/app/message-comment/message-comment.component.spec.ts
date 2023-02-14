import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCommentComponent } from './message-comment.component';

describe('MessageCommentComponent', () => {
  let component: MessageCommentComponent;
  let fixture: ComponentFixture<MessageCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

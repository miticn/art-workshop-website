import { Component, Input, OnInit } from '@angular/core';
import { Helper } from '../helper';

@Component({
  selector: 'app-message-comment',
  templateUrl: './message-comment.component.html',
  styleUrls: ['./message-comment.component.css']
})
export class MessageCommentComponent implements OnInit {

  constructor(public helper: Helper) { }
  @Input() profilePicture : string;
  @Input() text: string;
  @Input() date: Date;
  @Input() name: string;
  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Helper } from '../helper';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {

  constructor(public helper: Helper) { }
  @Input() profilePicture : string;
  @Input() text: string;
  @Input() date: Date;
  @Input() name: string;
  @Input() right: boolean=false;

  ngOnInit(): void {
  }

}

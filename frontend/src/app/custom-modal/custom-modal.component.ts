import { Component, OnInit, Renderer2 } from '@angular/core';
import {trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class CustomModalComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  showModal = true;
  title: string = 'Request Sent';
  message: string = 'Your registration request has been sent.';

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}

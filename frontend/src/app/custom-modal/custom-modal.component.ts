import { Component, ElementRef, Injectable, OnInit, Renderer2, ViewChild } from '@angular/core';
import {trigger, state, style, transition, animate } from '@angular/animations';
import { ModalService } from '../services/modal.service';


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
@Injectable({
  providedIn: 'root'
})
export class CustomModalComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: ElementRef;
  constructor(private renderer: Renderer2, private modalService: ModalService) {

  }

  ngOnInit(): void {
    this.modalService.setModal(this);
  }

  showModal = false;
  title: string = 'Request Sent';
  message: string = 'Your registration request has been sent.';

  set(title: string, message: string, func: Function) {
    this.title = title;
    this.message = message;
    this.onClickF = func;
  }
  onClickF: Function;
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.onClickF();
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() {
    
  }
  private modal;

  setModal(modal) {
    this.modal = modal;
  }

  openModal() {
    this.modal.openModal();
  }

  set(title: string, message: string, func: Function = null) {
    this.modal.set(title, message, func);
  }

}

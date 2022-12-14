import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  public toggleModal(element: HTMLElement): void {
    element.classList.toggle('open');
  }
}

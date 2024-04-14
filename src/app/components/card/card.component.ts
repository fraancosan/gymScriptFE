import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalActividadesPlanComponent } from '../modal-actividades-plan/modal-actividades-plan.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title!: string;
  @Input() cost!: string;
  @Input() cardListItems!: string[];
  @Input() id: string = '';
  modalRef!: BsModalRef;

  constructor(
    private router: Router,
    private modalService: BsModalService,
  ) {}

  navigateToUser() {
    this.router.navigate(['/user'], {
      state: { plan: this.id },
      queryParams: { plan: this.id },
    });
  }

  openModal() {
    this.modalRef = this.modalService.show(ModalActividadesPlanComponent, {
      initialState: {
        planId: this.id,
      },
    });
  }
}

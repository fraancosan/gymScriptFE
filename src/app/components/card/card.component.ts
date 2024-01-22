import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  navigateToUser() {
    localStorage.setItem('idPlan', this.id);
    this.router.navigate(['/user']);
  }
}

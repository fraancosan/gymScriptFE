import { Component, EventEmitter, Input, Output } from '@angular/core';
import {faArrowRightFromBracket, faBars, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @Input() usuario: any;
  @Output() queHacer = new EventEmitter<string>();

  menuIcon = faBars;
  gridIcon = faTableCellsLarge;
  logoutIcon = faArrowRightFromBracket;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  exportarDato(irA: string){
    this.queHacer.emit(irA);
  }
}
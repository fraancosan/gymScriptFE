import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';
import {
  faArrowRightFromBracket,
  faBars,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  @Input() usuario: any;
  @Output() queHacer = new EventEmitter<string>();
  @Output() closeSidebar = new EventEmitter<boolean>();

  menuIcon = faBars;
  gridIcon = faTableCellsLarge;
  logoutIcon = faArrowRightFromBracket;

  constructor(private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    let sideBar = document.getElementsByClassName('sidebar');
    if (event.target.innerWidth < 1100) {
      sideBar[0].classList.add('close');
      this.closeSidebar.emit(false);
    } else {
      sideBar[0].classList.remove('close');
      this.closeSidebar.emit(true);
    }
  }

  ngOnInit(): void {}

  closeMenu(): void {
    let sideBar = document.getElementsByClassName('sidebar');

    if (sideBar[0].classList.contains('close')) {
      sideBar[0].classList.remove('close');
      this.closeSidebar.emit(true);
    } else {
      sideBar[0].classList.add('close');
      this.closeSidebar.emit(false);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  exportarDato(irA: string) {
    if (window.innerWidth < 1100) {
      let sideBar = document.getElementsByClassName('sidebar');
      sideBar[0].classList.add('close');
      this.closeSidebar.emit(false);
    }
    this.queHacer.emit(irA);
  }
}

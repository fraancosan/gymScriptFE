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
import { LocalStorageService } from 'src/app/services/local-storage.service';

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

  close = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth < 1100) {
      this.close = true;
      this.closeSidebar.emit(true);
    } else {
      this.close = false;
      this.closeSidebar.emit(false);
    }
  }

  ngOnInit(): void {}

  closeMenu(): void {
    this.close = !this.close;
    this.closeSidebar.emit(this.close);
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.router.navigate(['/home']);
  }

  exportarDato(irA: string) {
    if (window.innerWidth < 1100) {
      this.close = true;
      this.closeSidebar.emit(this.close);
    }
    this.queHacer.emit(irA);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2600);
  }
}

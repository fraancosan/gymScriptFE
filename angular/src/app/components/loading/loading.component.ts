import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent {
  ngOnInit(): void {
    let loading = document.getElementById('loading');
    if (window.innerWidth >= 500) {
      document.body.style.overflow = 'hidden';
      
      if (loading) {
        loading.classList.remove('hidden');
      }

      setTimeout(() => {
        document.body.style.overflow = 'auto';
        if (loading) {
          loading.classList.add('hidden');
        }
      },2600);
    } 
  }
}
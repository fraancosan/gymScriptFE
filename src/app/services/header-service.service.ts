import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderServiceService {
  showHeader: boolean = true;

  constructor() {}
}

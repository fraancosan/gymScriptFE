import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private urlBack: string = environment.urlBack;

  alterSize(name: string, size: string): string {
    const parts = name.split('.');
    const ext = parts.pop();
    const urlWithoutExt = parts.join('.');
    return urlWithoutExt + '-' + size + '.' + ext;
  }

  alterUrl(name: string): string {
    return this.urlBack + name;
  }
}

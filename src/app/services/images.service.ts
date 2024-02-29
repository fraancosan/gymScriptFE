import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private urlBack: string = environment.urlBack;

  alterSize(name: string, size: string): string {
    let parts = name.split('.');
    let ext = parts.pop();
    let urlWithoutExt = parts.join('.');
    return urlWithoutExt + '-' + size + '.' + ext;
  }

  alterUrl(name: string): string {
    return this.urlBack + name;
  }
}

import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {
  faPaperPlane,
  faLocationDot,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  facebookIcon = faFacebook;
  twitterIcon = faTwitter;
  instagramIcon = faInstagram;
  planeIcon = faPaperPlane;
  locationIcon = faLocationDot;
  phoneIcon = faPhone;
  envelopeIcon = faEnvelope;

  constructor(
    private viewPortScroller: ViewportScroller,
  ) {}

  irAHome() {
    this.viewPortScroller.scrollToPosition([0, 0]);
  }

  irANosotros() {
    this.viewPortScroller.scrollToAnchor('Nosotros');
  }

  irAPlanes() {
    this.viewPortScroller.scrollToAnchor('planes');
  }

  irASedes() {
    this.viewPortScroller.scrollToAnchor('sedes');
  }

  irAProductos() {
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}

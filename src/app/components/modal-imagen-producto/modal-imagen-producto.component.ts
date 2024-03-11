import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-modal-imagen-producto',
  templateUrl: './modal-imagen-producto.component.html',
  styleUrls: ['./modal-imagen-producto.component.css'],
})
export class ModalImagenProductoComponent {
  @Input() img!: string;
  @Input() editando!: boolean;
  @Output() fileChange = new EventEmitter<any>();
  newImg = '';

  modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private imgService: ImagesService,
  ) {}

  ngOnInit() {
    if (this.img != '') {
      this.img = this.imgService.alterUrl(
        this.imgService.alterSize(this.img, 'small'),
      );
    }
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  getFile(event: any) {
    const file = event.target.files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (file && validTypes.includes(file.type)) {
      this.fileChange.emit(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newImg = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      event.target.value = '';
    }
  }
}

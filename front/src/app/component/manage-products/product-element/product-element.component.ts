import {Component, Input, OnInit} from '@angular/core';
import {ModalOpenType} from "../../misc/modal-open-type";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {Product} from "../../../model/odSystem/product";
import {CookieComponent} from "../../misc/cookie-component";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-product-element',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './product-element.component.html',
  styleUrl: './product-element.component.scss'
})
export class ProductElementComponent extends CookieComponent implements OnInit {

  ModalOpenType = ModalOpenType;
  faTrash = faTrash;
  faPen = faPen;

  productImgUrls: string[] = [];

  @Input() product!: Product | undefined;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.product?.productImages.forEach((productImage) => {
      this.fetchUserService().downloadFiles(productImage.path).subscribe({
        next: (httpEvent: HttpEvent<Blob>) => {
          if (httpEvent.type === HttpEventType.Response) {
            const file: File = new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
              {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`});
            this.productImgUrls.push(URL.createObjectURL(file));
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error downloading file");
        }
      });
    });
  }

  openModal(modalOpenType: ModalOpenType) {

  }
}

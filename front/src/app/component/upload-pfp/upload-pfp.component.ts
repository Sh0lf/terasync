import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {ModalComponent} from "../misc/modal-component";
import {UploadPfpModalService} from "../../service/misc/upload-pfp-modal.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {Subscription} from "rxjs";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from "@angular/material/icon";
import {FileService} from "../../service/misc/file.service";
import {faUser, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {DomSanitizer} from "@angular/platform-browser";
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../service/user/current-user.service";

@Component({
  selector: 'app-upload-pfp',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    MatProgressBarModule,
    FaIconComponent
  ],
  templateUrl: './upload-pfp.component.html',
  styleUrl: './upload-pfp.component.scss'
})
export class UploadPfpComponent extends ModalComponent<UploadPfpModalService> implements OnInit {
  file!: File | null;
  imgUrl: string = '';
  statusMsg: string = '';
  pfpImgChanged: boolean = false;

  faXmark = faXmark;
  faUser = faUser;

  @ViewChild('imageInput') fileInput!: ElementRef;

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override modalService: UploadPfpModalService,
              private fileService: FileService, private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then();
  }

  onPfpImgSelected(event: any) {
    this.file = event.target.files[0];
    if(this.file != null) this.imgUrl = URL.createObjectURL(this.file);
  }

  onSaveChanges(): void {
    if (this.file == null || (this.file?.type != 'image/png' && this.file?.type != 'image/jpeg')) {
      this.statusMsg = 'Invalid file type!';
      return;
    }
    const newFileName = this.currentUserService.getPfpImgPrefix() + this.file.name;
    const formData = new FormData();
    formData.append('files', this.file, newFileName);
    formData.append('miscData', this.currentUserService.getUser()?.email!);

    this.fetchUserService().uploadFiles(formData).subscribe({
      next: (event: HttpEvent<string[]>) => {
        this.reportProgress(event, newFileName);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }
  // onDownloadFiles(filename: string): void {
  //   this.fileService.downloadFiles(filename).subscribe({
  //     next: (event: HttpEvent<Blob>) => {
  //       this.reportProgress(event);
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.error(error);
  //     }
  //   });

  // }

  private updatePfpImgPath(newFileName: string) {
    this.fetchUserService()
      .updatePfpImgPathByEmail({email: this.currentUserService.getUser()?.email!, pfpImgPath: newFileName}).subscribe({
      next: (response: number) => {
        console.log('Pfp img path updated: ', response);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    })
  }

  private deleteOldPfpImg() {
    if(this.currentUserService.getUser()?.pfpImgPath!.length == 0) return;
    this.fetchUserService().deleteFile(this.currentUserService.getUser()?.pfpImgPath!).subscribe({
      next: (response: boolean) => {
        console.log('Old profile picture deleted: ', response);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  private reportProgress(httpEvent: HttpEvent<string[]>, newFileName: string) {
    switch (httpEvent.type) {
      case HttpEventType.ResponseHeader:
        console.log('Response header has been received: ', httpEvent);
        break;
      case HttpEventType.Response:
        this.statusMsg = 'Your profile picture has been uploaded!';
        this.deleteOldPfpImg();
        this.updatePfpImgPath(newFileName);
        this.currentUserService.setPfpImgUrl(this.imgUrl);
        this.resetValues();
        this.pfpImgChanged = true;
        break;
      case HttpEventType.Sent:
        console.log('Request has been made!');
        this.statusMsg = 'Uploading...';
        break;
      default:
        console.log('Event: ', httpEvent);
    }
  }

  deleteImage() {
    this.imgUrl = "";
    this.currentUserService.setPfpImgUrl("");
    this.deleteOldPfpImg();
    this.updatePfpImgPath("");
    this.pfpImgChanged = true;
  }

  resetValues() {
    this.fileInput.nativeElement.value = "";
    this.file = null;
    this.statusMsg = "";
  }

  hasStatus() {
    return this.statusMsg.length > 0;
  }

  override closeModal() {
    this.imgUrl = "";
    this.resetValues();
    super.closeModal();
    this.reloadPage();
  }

  reloadPage() {
    if(this.pfpImgChanged) window.location.reload();
    this.pfpImgChanged = false;
  }

  getUserPfpImgUrl() {
    if(this.imgUrl.length > 0) {
      return this.imgUrl;
    } else if(this.currentUserService.hasPfpImg()) {
      return this.currentUserService.getPfpImgUrl();
    } else {
      return "";
    }
  }

  internalHasUserPfpImg() {
    return this.getUserPfpImgUrl() != undefined && this.getUserPfpImgUrl()!.length > 0;
  }
}


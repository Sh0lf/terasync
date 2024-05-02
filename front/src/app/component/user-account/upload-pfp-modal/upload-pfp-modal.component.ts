import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {ModalComponent} from "../../misc/modal-component";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from "@angular/material/icon";
import {FileService} from "../../../service/misc/file.service";
import {faCheck, faTrash, faUser, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {DomSanitizer} from "@angular/platform-browser";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {UploadStatus} from "../../misc/form-component";

@Component({
  selector: 'app-upload-pfp',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    MatProgressBarModule,
    FaIconComponent
  ],
  templateUrl: './upload-pfp-modal.component.html',
  styleUrl: './upload-pfp-modal.component.scss'
})
export class UploadPfpModalComponent extends ModalComponent {
  file!: File | null;
  imgUrl: string = '';
  statusMsg: string = '';
  pfpImgChanged: boolean = false;

  faXmark = faXmark;
  faUser = faUser;
  faCheck = faCheck;
  faTrash = faTrash;

  @Input() override isModalOpen = false
  @Output() override onChangeEmitter = new EventEmitter<boolean>()

  @ViewChild('imageInput') fileInput!: ElementRef;

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              private fileService: FileService, private sanitizer: DomSanitizer) {
    super();
  }

  onPfpImgSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file != null) this.imgUrl = URL.createObjectURL(this.file);
  }

  onSaveChanges(): void {
    if (!this.isFormValid()) {
      this.statusMsg = 'Invalid file type!';
      return;
    }
    const newFileName = this.currentUserService.getPfpImgPrefix() + this.file?.name;
    const formData = new FormData();
    formData.append('files', this.file!, newFileName);

    this.uploadFiles(this.fetchUserService(), formData).subscribe({
      next: (uploadStatus: UploadStatus) => {
        this.statusMsg = uploadStatus.statusMsg;
        if(uploadStatus.isSuccessful) {
          this.deleteOldPfpImg();
          this.updatePfpImgPath(newFileName);
          this.currentUserService.setPfpImgUrl(this.imgUrl);
          this.resetValues();
          this.pfpImgChanged = true;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    })
  }

  override isFormValid(): boolean {
    return this.file != null && (this.file?.type == 'image/png' || this.file?.type == 'image/jpeg');
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
      .updatePfpImgPathByEmail({email: this.currentUserService.user?.email!, pfpImgPath: newFileName}).subscribe({
      next: (response: number) => {
        console.log('Pfp img path updated: ', response);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    })
  }

  private deleteOldPfpImg() {
    if (this.currentUserService.user?.pfpImgPath == null || this.currentUserService.user?.pfpImgPath!.length == 0) return;
    this.fetchUserService().deleteFile(this.currentUserService.user?.pfpImgPath!).subscribe({
      next: (response: boolean) => {
        console.log('Old profile picture deleted: ', response);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
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
  }

  override closeModal() {
    this.imgUrl = "";
    this.statusMsg = "";
    this.resetValues();
    super.closeModal();
    this.reloadPage();
  }

  reloadPage() {
    if (this.pfpImgChanged) window.location.reload();
    this.pfpImgChanged = false;
  }

  getUserPfpImgUrl() {
    if (this.imgUrl.length > 0) {
      return this.imgUrl;
    } else if (this.currentUserService.hasPfpImg()) {
      return this.currentUserService.getPfpImgUrl();
    } else {
      return "";
    }
  }

  internalHasUserPfpImg() {
    return this.getUserPfpImgUrl() != undefined && this.getUserPfpImgUrl()!.length > 0;
  }
}


import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {ModalComponent} from "../../misc/modal-component";
import {HttpErrorResponse} from "@angular/common/http";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from "@angular/material/icon";
import {FileService} from "../../../service/misc/file.service";
import {faCheck, faTrash, faUser, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {UploadStatus} from "../../misc/form-component";
import {User} from "../../../model/user/user";
import {UserService} from "../../../service/user/user.service";

@Component({
  selector: 'app-upload-pfp-modal',
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

  @Input() user!: User;
  @Input() userService!: UserService<any>;

  @ViewChild('imageInput') fileInput!: ElementRef;

  constructor() {
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
    const newFileName = this.user.getPfpImgPrefix()! + this.file?.name;
    const formData = new FormData();
    formData.append('files', this.file!, newFileName);

    this.uploadFiles(this.userService, formData).subscribe({
      next: (uploadStatus: UploadStatus) => {
        this.statusMsg = uploadStatus.statusMsg;
        if (uploadStatus.isSuccessful) {
          this.deleteOldPfpImg();
          this.updatePfpImgPath(newFileName);
          this.user.setPfpImgUrl(this.imgUrl);
          this.pfpImgChanged = true;
          this.resetValues();
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

  private updatePfpImgPath(newFileName: string) {
    this.userService.updatePfpImgPathByEmail(
      {
        email: this.user.email!,
        pfpImgPath: newFileName
      }
    ).subscribe({
      next: (response: number) => {
        console.log('Pfp img path updated: ', response);
        this.user.setPfpImgPath(newFileName);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    })
  }

  private deleteOldPfpImg() {
    if (this.user.pfpImgPath == null || this.user.pfpImgPath!.length == 0) return;
    this.userService.deleteFile(this.user.pfpImgPath!).subscribe({
      next: (response: boolean) => {
        console.log('Old profile picture deleted: ', response);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  deleteImage() {
    this.deleteOldPfpImg();
    this.imgUrl = "";
    this.user.setPfpImgUrl("");
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
  }

  getUserPfpImgUrl() {
    if (this.imgUrl.length > 0) {
      return this.imgUrl;
    } else if (this.user.hasPfpImg()) {
      return this.user.pfpImgUrl;
    } else {
      return "";
    }
  }

  internalHasUserPfpImg() {
    return this.getUserPfpImgUrl() != undefined && this.getUserPfpImgUrl()!.length > 0;
  }
}


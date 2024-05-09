import {Injectable} from "@angular/core";
import {UserCategory} from "../user/userCategories";
import {UserService} from "../user/user.service";
import {RegistrationType} from "../../component/authentication/register/registration-type";
import {EditableElement, usernameElement} from "../../component/misc/editable-element";

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {
  private _editingUserCategory!: UserCategory;
  private _editingUserService!: UserService<any>;
  private _registrationType!: RegistrationType;
  private _editableElements!: EditableElement[];
  private _fieldFilter: string;
  private _searchInput: string = '';

  protected constructor() {
    this._fieldFilter = usernameElement.name;
  }

  get editingUserCategory(): UserCategory | undefined {
    return this._editingUserCategory;
  }

  set editingUserCategory(value: UserCategory) {
    this._editingUserCategory = value;
  }

  get editingUserService(): UserService<any> | undefined {
    return this._editingUserService;
  }

  set editingUserService(value: UserService<any>) {
    this._editingUserService = value;
  }

  get registrationType(): RegistrationType | undefined {
    return this._registrationType;
  }

  set registrationType(value: RegistrationType) {
    this._registrationType = value;
  }

  get editableElements(): EditableElement[] {
    return this._editableElements;
  }

  set editableElements(value: EditableElement[]) {
    this._editableElements = value;
  }

  get fieldFilter(): string {
    return this._fieldFilter;
  }

  set fieldFilter(value: string) {
    this._fieldFilter = value;
  }

  get searchInput(): string {
    return this._searchInput;
  }

  set searchInput(value: string) {
    this._searchInput = value;
  }
}

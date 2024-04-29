import {EditableElementType} from "./editable-element-type";
import {
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory,
  userCategories,
  UserCategory
} from "../../../service/user/userCategories";

export class EditableElement {
  name: string;
  private _value: string;

  editableElementType: EditableElementType;
  userCategories: UserCategory[] = [];
  isEditable: boolean = true;

  constructor(name: string, value: string, editableElementType: EditableElementType, userCategories: UserCategory[], isEditable?: boolean) {
    this.name = name;
    this._value = value;
    this.editableElementType = editableElementType;
    this.userCategories = userCategories;

    if (isEditable !== undefined) {
      this.isEditable = isEditable;
    }
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }
}

export const nameElement = new EditableElement('Name', '', EditableElementType.TEXT, [businessCategory, deliveryServiceCategory])
export const usernameElement = new EditableElement('Username', '', EditableElementType.TEXT, userCategories);
export const passwordElement = new EditableElement('Password', '', EditableElementType.PASSWORD, userCategories);
export const emailElement = new EditableElement('Email', '', EditableElementType.EMAIL, userCategories, false);
export const phoneElement = new EditableElement('Phone', '', EditableElementType.NUMBER, [businessCategory]);
export const addressElement = new EditableElement('Address', '', EditableElementType.TEXT, [businessCategory]);
export const firstNameElement = new EditableElement('First Name', '', EditableElementType.TEXT, [customerCategory, adminCategory, deliveryPersonCategory]);
export const lastNameElement = new EditableElement('Last Name', '', EditableElementType.TEXT, [customerCategory, adminCategory, deliveryPersonCategory]);


export const editableElements: EditableElement[] = [
  nameElement,
  firstNameElement,
  lastNameElement,
  usernameElement,
  phoneElement,
  addressElement,
  emailElement,
  passwordElement,
];

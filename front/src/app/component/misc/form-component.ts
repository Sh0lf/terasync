import {ActivatedRoute, Router} from "@angular/router";
import {CookieComponent} from "./cookie-component";

export abstract class FormComponent extends CookieComponent {
  protected isSubmitted: boolean = false;

  onSubmit() {
    this.isSubmitted = true;
  };

  abstract isFormValid(): boolean;
}

import {ActivatedRoute, Router} from "@angular/router";
import {CookieComponent} from "./cookie-component";

export abstract class FormComponent extends CookieComponent {
  protected isSubmitted: boolean = false;

  onSubmit() {
    this.isSubmitted = true;
  };

  routeToHome(router: Router, route: ActivatedRoute) {
    router.navigate([''], {relativeTo: route}).then();
  }

  abstract isFormValid(): boolean;
}

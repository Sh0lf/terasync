import {ActivatedRoute, Router} from "@angular/router";

export abstract class FormComponent {
  protected isSubmitted: boolean = false;

  onSubmit() {
    this.isSubmitted = true;
  };

  routeToHome(router: Router, route: ActivatedRoute) {
    router.navigate([''], {relativeTo: route}).then();
  }

  abstract isFormValid(): boolean;
}

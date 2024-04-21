export abstract class FormComponent {
  protected isSubmitted: boolean = false;

  onSubmit() {
    this.isSubmitted = true;
  };

  abstract isFormValid(): boolean;
}

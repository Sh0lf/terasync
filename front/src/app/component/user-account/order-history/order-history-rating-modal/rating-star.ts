export class RatingStar {
  value: number;
  isHovered: boolean;
  isClicked: boolean;

  constructor(value: number) {
    this.value = value;
    this.isHovered = false;
    this.isClicked = false;
  }

  getClass(): string {
    if (this.isClicked || this.isHovered) {
      return "clickable-icon-elem-1-clicked";
    } else {
      return "clickable-icon-elem-1";
    }
  }

  getStaticClass(): string {
    if (this.isClicked || this.isHovered) {
      return "clickable-icon-elem-1-static-clicked";
    } else {
      return "clickable-icon-elem-1-static";
    }
  }

  setClicked(isClicked: boolean) {
    this.isClicked = isClicked;
  }
}

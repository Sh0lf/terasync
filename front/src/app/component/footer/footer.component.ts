import {Component, Input, OnInit} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  footerTopValue!: number;
  position: string = 'static';

  @Input() footerTopPadding: number = 0;
  @Input() footerTopMinValue: number = 0;
  @Input() isFooterTopDynamic: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    if(this.isFooterTopDynamic) {
      this.position = 'absolute';
      this.footerTopValue = Math.max(this.footerTopMinValue, window.innerHeight);
    }
  }

  onResize(event: any) {
    if(this.isFooterTopDynamic) {
      this.footerTopValue = Math.max(this.footerTopMinValue, window.innerHeight);
    }
  }

}

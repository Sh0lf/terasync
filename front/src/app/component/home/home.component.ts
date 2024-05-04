import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {CookieComponent} from "../misc/cookie-component";
import {NgxResizeObserverModule} from "ngx-resize-observer";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    NgxResizeObserverModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends CookieComponent {

}

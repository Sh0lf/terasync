import { Component } from '@angular/core';
import {LogoComponent} from "../../logo/logo.component";

@Component({
  selector: 'app-header-default',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './header-default.component.html',
  styleUrl: './header-default.component.scss'
})
export class HeaderDefaultComponent {

}

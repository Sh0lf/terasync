import { Component } from '@angular/core';
import {LogoComponent} from "../../logo/logo.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header-default',
  standalone: true,
  imports: [LogoComponent, NgOptimizedImage],
  templateUrl: './header-default.component.html',
  styleUrl: './header-default.component.scss'
})
export class HeaderDefaultComponent {

}

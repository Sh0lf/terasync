import { Component } from '@angular/core';
import {LogoComponent} from "../../logo/logo.component";
import {NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-header-default',
  standalone: true,
  imports: [LogoComponent, NgOptimizedImage],
  templateUrl: './header-default.component.html',
  styleUrl: './header-default.component.scss'
})
export class HeaderDefaultComponent {

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  loginOnClick() {
    this.router.navigate(['/login'], {relativeTo: this.route}).then();
  }

  registerOnClick() {
    this.router.navigate(['/register'], {relativeTo: this.route}).then();
  }
}

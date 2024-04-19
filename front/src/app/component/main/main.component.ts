import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {LoginComponent} from "../login/login.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [RouterOutlet, NgForOf, HttpClientModule, LoginComponent, HeaderComponent, FooterComponent, NgIf],
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public title = 'teraSyncFront';

  constructor(private router: Router) {
  }

  isCurrentRoute(...route: string[]): boolean {
    return route.includes(this.router.url);
  }
}

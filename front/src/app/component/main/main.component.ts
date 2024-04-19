import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {LoginComponent} from "../login/login.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [RouterOutlet, NgForOf, HttpClientModule, LoginComponent, HeaderComponent, FooterComponent],
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public title = 'teraSyncFront';

  constructor() {
  }

  ngOnInit(): void {
    // this.getCustomers();
  }
}

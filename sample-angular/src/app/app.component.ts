import {Component} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {HousingLocationComponent} from "./housing-location/housing-location.component";
import {CommonModule} from "@angular/common";
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, HousingLocationComponent, CommonModule, RouterModule, RouterLink, RouterOutlet],
  templateUrl: 'back-app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}

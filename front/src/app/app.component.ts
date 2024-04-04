import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CustomerService} from "./service/customer.service";
import {Customer} from "./model/user/customer";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public title = 'teraSyncFront';
  public customers: Customer[] = [];

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  public getCustomers(): void {
    this.customerService.getEntities().subscribe({
      next: (customers: Customer[]) => {
        this.customers = customers;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {getDateTime} from "../../../misc/functions";
import {CustomerOrderElement} from "./customer-order-element";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-customer-order-element',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './customer-order-element.component.html',
  styleUrl: './customer-order-element.component.scss'
})
export class CustomerOrderElementComponent implements OnInit {
  @Input() customerOrderElement!: CustomerOrderElement | undefined;
  creationTime: string = "";
  deliveryTime: string = "";

  constructor() {
  }

  ngOnInit(): void {
    this.creationTime = getDateTime(this.customerOrderElement?.customerOrder.creationTime!);
    if(this.customerOrderElement?.customerOrder.hasDeliveryTime()) {
      this.deliveryTime = getDateTime(this.customerOrderElement?.customerOrder.deliveryTime!);
    }
  }

}

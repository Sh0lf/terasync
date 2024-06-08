import {CustomerOrder} from "./customer.order";
import {User} from "../user/user";

export class PaymentMethod {
  paymentMethodId: number | undefined;
  name: string
  cardNumber: string;
  billingCountry: string;
  billingStreet: string;
  billingPostalCode: string;
  billingCity: string;
  customerId: number;
  defaultPaymentMethod: boolean;


  constructor(customerId: number,
              name: string,
              card: string,
              billingCountry: string,
              billingPostalCode: string,
              billingCity: string,
              billingStreet: string,
              defaultPaymentMethod: boolean,
              paymentMethodId?: number) {
    this.customerId = customerId;
    this.billingCountry= billingCountry;
    this.billingStreet = billingStreet;
    this.billingPostalCode= billingPostalCode;
    this.billingCity = billingCity;
    this.defaultPaymentMethod = defaultPaymentMethod;
    this.paymentMethodId = paymentMethodId;
    this.name = name;
    this.cardNumber = card;
  }

  public static fromJson(json: PaymentMethod): PaymentMethod {
    return new PaymentMethod(json.customerId, json.name, json.cardNumber, json.billingCountry, json.billingPostalCode,
      json.billingCity, json.billingStreet, json.defaultPaymentMethod,  json.paymentMethodId);
  }

  setDefaultPayment(defaultPaymentMethod: boolean) {
    this.defaultPaymentMethod = defaultPaymentMethod;
  }

  static initializePayments(json: {paymentMethods: PaymentMethod[] | undefined}): PaymentMethod[] {
    let payments: PaymentMethod[] = [];
    if (json.paymentMethods != undefined) {
      for (let payment of json.paymentMethods) {
        payments.push(PaymentMethod.fromJson(payment));
      }
    }
    return payments;
  }

  static initializePayment(jsonCustomerOrder: CustomerOrder) {
    let paymentMethod : PaymentMethod | undefined;

    if (jsonCustomerOrder.paymentMethod != undefined) {
      paymentMethod = PaymentMethod.fromJson(jsonCustomerOrder.paymentMethod);
    }

    return paymentMethod;
  }
}

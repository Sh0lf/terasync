export class Address {
  addressId: number | undefined;
  customerId: number;
  country: string;
  street: string;
  postalCode: string;
  city: string;
  info: string;
  defaultAddress: boolean;


  constructor(customerId: number, country: string,
              street: string, postalCode: string,
              city: string, info: string, defaultAddress: boolean,
              addressId?: number) {
    this.customerId = customerId;
    this.country = country;
    this.street = street;
    this.postalCode = postalCode;
    this.city = city;
    this.info = info;
    this.addressId = addressId;
    this.defaultAddress = defaultAddress;
  }
}

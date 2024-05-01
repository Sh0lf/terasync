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

  public static fromJson(json: Address): Address {
    return new Address(json.customerId, json.country,
      json.street, json.postalCode, json.city, json.info,
      json.defaultAddress, json.addressId);
  }

  setDefaultAddress(defaultAddress: boolean) {
    this.defaultAddress = defaultAddress;
  }

  static initializeAddresses(json: {addresses: Address[]}): Address[] {
    let addresses: Address[] = [];
    if (json.addresses) {
      for (let address of json.addresses) {
        addresses.push(Address.fromJson(address));
      }
    }
    return addresses;
  }
}

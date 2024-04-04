export class Customer {
  customerId: number;
  firstName: String;
  lastName: String;
  email: String;
  username: String;
  password: String;
  registrationDate: String;
  name: String;
  id: number;

  constructor(customerId: number, firstName: String, lastName: String, email: String, username: String, password: String, registrationDate: String, name: String, id: number) {
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
    this.registrationDate = registrationDate;
    this.name = name;
    this.id = id;
  }
}

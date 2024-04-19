export abstract class User {
  email: string;
  username: string;
  password: string;
  registrationDate: string;

  protected constructor(email: string, username: string, password: string, registrationDate: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.registrationDate = registrationDate;
  }

  getName(): string {
    return "aaa";
  };
  getUserId(): number {
    return 4;
  };
}

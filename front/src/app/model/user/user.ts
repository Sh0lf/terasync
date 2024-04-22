export abstract class User {
  email: string;
  username: string;
  password: string;
  registrationDate: string | undefined;
  token: string | undefined;

  protected constructor(email: string, username: string, password: string, registrationDate?: string, token?: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.registrationDate = registrationDate;
    this.token = token;
  }

  abstract getName(): string;

  abstract getUserId(): number | undefined;

  static fromJson<T extends User>(jsonUser: T, user: T): User {
    return user.createInstance(jsonUser);
  }

  abstract createInstance(jsonString: User): User;
}

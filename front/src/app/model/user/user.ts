export abstract class User {
  email: string;
  username: string;
  password: string;
  registrationDate: string | undefined;

  protected constructor(email: string, username: string, password: string, registrationDate?: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.registrationDate = registrationDate;
  }

  abstract getName(): string;

  abstract getUserId(): number | undefined;

  static fromJson<T extends User>(jsonUser: T, user: T): User {
    return user.createInstance(jsonUser);
  }

  abstract createInstance(jsonString: User): User;
}

export abstract class User {
  userId: number | undefined;
  name: string | undefined;
  email: string;
  username: string;
  password: string;
  token: string | undefined;
  registrationDate: string | undefined;

  protected constructor(email: string, username: string, password: string, userId?: number, registrationDate?: string, token?: string, name?: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.userId = userId;
    this.registrationDate = registrationDate;
    this.token = token;
    this.name = name;
  }

  static fromJson<T extends User>(jsonUser: T, user: T): User {
    return user.createInstance(jsonUser);
  }

  abstract createInstance(jsonString: User): User;
}

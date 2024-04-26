export abstract class User {
  userId: number | undefined;
  name: string | undefined;

  email: string;
  username: string;
  password: string;

  registrationDate: string | undefined;
  token: string | undefined;
  emailVerified: boolean | undefined;


  protected constructor(email: string, username: string, password: string,
                        userId?: number, registrationDate?: string,
                        token?: string, emailVerified?: boolean, name?: string) {
    this.userId = userId;
    this.name = name;

    this.email = email;
    this.username = username;
    this.password = password;

    this.registrationDate = registrationDate;
    this.token = token;
    this.emailVerified = emailVerified;
  }
}

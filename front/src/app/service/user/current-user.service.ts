import {User} from "../../model/user/user";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private counter: number = 0;
  private user!: User;
  private pfpImgUrl: string | undefined;

  private mainPromise!: Promise<boolean>;

  constructor() {
  }

  public getCounter(): number {
    return this.counter;
  }

  public incrementCounter(): void {
    this.counter++;
  }

  public getUser(): User | undefined {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  setPfpImgUrl(pfpImgUrl: string) {
    this.pfpImgUrl = pfpImgUrl;
  }

  getPfpImgUrl(): string | undefined {
    return this.pfpImgUrl;
  }

  getPfpImgPrefix(): string {
    return this.user?.userId + "-";
  }

  isLoggedIn(): boolean {
    return this.user !== undefined && this.user !== null;
  }

  hasPfpImg(): boolean {
    return this.isLoggedIn() &&
      this.user.pfpImgPath !== null &&
      this.user.pfpImgPath !== undefined &&
      this.user.pfpImgPath.length > 0;
  }

  getMainPromise(): Promise<boolean> {
    return this.mainPromise;
  }

  setMainPromise(mainPromise: Promise<boolean>): void {
    this.mainPromise = mainPromise;
  }

}

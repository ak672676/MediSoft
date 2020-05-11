import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { LocalStorageService } from "./local-storage.service";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router, private storage: LocalStorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const loggedIn = this.isLoggedIn();

    console.log("->", this.isLoggedIn());
    let activate = loggedIn;
    let redirect = "/dashboard";
    if (route.data.loggedIn) {
      activate = !activate;
      redirect = "/login";
    }

    if (!activate) {
      return true;
    } else {
      this.router.navigate([redirect]);
      return false;
    }
  }
  isLoggedIn() {
    if (this.storage.getToken()) {
      return true;
    }
    return false;
  }

  logout() {
    this.router.navigate(["/"]);
    console.log("Token");
    console.log(this.storage.getParsedToken());
    this.storage.removeToken();
  }
}

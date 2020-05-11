import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { LocalStorageService } from "../local-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public formError = "";
  public formData = {
    email: "",
    password: "",
  };
  constructor(
    private api: ApiService,
    private storage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {}
  public formSubmit() {
    this.formError = "";
    if (!this.formData.email || !this.formData.password) {
      return (this.formError = "All fields are required");
    }
    if (!this.formError) {
      this.login();
    }
  }

  private login() {
    let requestObject = {
      method: "POST",
      location: "api/admins/login",
      body: this.formData,
    };

    this.api.makeRequest(requestObject).then((val) => {
      if (val.token) {
        console.log(val);
        this.storage.setToken(val.token);
        this.router.navigate(["/dashboard"]);
        return;
      }

      if (val.message) {
        this.formError = val.error.message;
      }
    });
  }
}

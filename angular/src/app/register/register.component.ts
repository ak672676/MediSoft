import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { LocalStorageService } from "../local-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public newAdmin = {
    firstName: "",
    lastName: "",
    email: "",
    adharNo: "",
    address: "",
    phone: "",
    password: "",
    password2: "",
  };

  public formError = "";
  constructor(
    private api: ApiService,
    private storage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  public formSubmit() {
    this.formError = "";
    if (
      !this.newAdmin.firstName ||
      !this.newAdmin.lastName ||
      !this.newAdmin.email ||
      !this.newAdmin.password ||
      !this.newAdmin.password2 ||
      !this.newAdmin.address ||
      !this.newAdmin.adharNo ||
      !this.newAdmin.phone
    ) {
      return (this.formError = "All fields are required");
    }
    // var re = new RegExp(
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // );
    // if (!re.test(this.newAdmin.email)) {
    //   return (this.formError = "Please Enter a valid Email Address");
    // }
    if (this.newAdmin.password !== this.newAdmin.password2) {
      return (this.formError = "Password doesn't match.");
    }
    this.register();
  }

  private register() {
    this.formError = "";
    let requestObject = {
      method: "POST",
      location: "api/admins/registerAdmin",
      body: this.newAdmin,
    };
    this.api.makeRequest(requestObject).then((val) => {
      if (val.success) {
        // this.storage.setToken(val.token);
        this.router.navigate(["/"]);
        return;
      }
      if (val.message) {
        this.formError = val.error.message;
      }
      console.log(val);
    });
  }
}

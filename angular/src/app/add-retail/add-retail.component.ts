import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";

@Component({
  selector: "app-add-retail",
  templateUrl: "./add-retail.component.html",
  styleUrls: ["./add-retail.component.css"],
})
export class AddRetailComponent implements OnInit {
  public retailShop = {
    shopName: "",
    ownerName: "",
    email: "",
    address: "",
    city: "",
    gstin: "",
    drugLic: "",
    panNo: "",
    cellNo: "",
    cellNo2: "",
    adharNo: "",
    foodLic: "",
  };
  public formError = "";

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {}

  public formSubmit() {
    this.formError = "";
    if (
      !this.retailShop.shopName ||
      !this.retailShop.ownerName ||
      !this.retailShop.email ||
      !this.retailShop.address ||
      !this.retailShop.city ||
      !this.retailShop.drugLic ||
      !this.retailShop.cellNo ||
      !this.retailShop.adharNo
    ) {
      return (this.formError = "All fields are required");
    }
    // var re = new RegExp(
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // );
    // if (!re.test(this.retailShop.email)) {
    //   return (this.formError = "Please Enter a valid Email Address");
    // }

    this.addRetailCustomer();
  }
  private addRetailCustomer() {
    this.formError = "";
    let requestObject = {
      method: "POST",
      location: "api/customers/addCustomer",
      body: this.retailShop,
    };
    this.api.makeRequest(requestObject).then((val) => {
      console.log(val);
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

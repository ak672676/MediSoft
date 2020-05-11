import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-add-supplier",
  templateUrl: "./add-supplier.component.html",
  styleUrls: ["./add-supplier.component.css"],
})
export class AddSupplierComponent implements OnInit {
  public formError = "";
  public newSupplier = {
    supplierName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin: "",
    email: "",
    gsttin: "",
    drugLic: "",
    cellNo: "",
    cellNo2: "",
    panNo: "",
  };
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void {}

  public formSubmit() {
    this.formError = "";
    if (
      !this.newSupplier.supplierName ||
      !this.newSupplier.drugLic ||
      !this.newSupplier.address ||
      !this.newSupplier.city ||
      !this.newSupplier.cellNo
    ) {
      this.formError = "* Fields are necessary";
      return;
    }
    this.registerSupplier();
  }
  private registerSupplier() {
    this.formError = "";
    let requestObject = {
      method: "POST",
      location: "api/suppliers/addSupplier",
      body: this.newSupplier,
    };
    this.api.makeRequest(requestObject).then((val) => {
      console.log(val);
      if (val.success) {
        this.router.navigate(["/"]);
        return;
      }
      if (val.message) {
        this.formError = val.error.message;
      }
    });
  }
}

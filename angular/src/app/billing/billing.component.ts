import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../api.service";
import { CustomerService } from "../customer.service";
import { FormControl } from "@angular/forms";
// import {Observable} from 'rxjs';
import { startWith, map } from "rxjs/operators";
@Component({
  selector: "app-billing",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.css"],
})
export class BillingComponent implements OnInit {
  public bill = {
    buyerName: "",
    address: "",
    city: "",
    gstin: "",
    drugLic: "",
    invoiceDate: Date(),
    invoiceNo: "",
    placeOfSupply: "",
    panNo: "",
    phone: "",
    items: [],
  };
  control = new FormControl();
  public streets: string[] = [];
  filteredStreets: Observable<string[]>;

  observableOptions: Observable<any>;
  customersListForSearching = <any>[];
  ngOnInit() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
    this.onChanges();
  }
  onChanges() {
    this.control.valueChanges.subscribe((val) => {
      if (!val) {
        return;
      }
      this.bill.buyerName = val;
      this.customer.searchCustomer(this.bill).subscribe((data) => {
        this.customersListForSearching = data;
        this.streets = this.customersListForSearching.customers.map(
          (c) => c.shopName
        );
      });
    });
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter((street) =>
      this._normalizeValue(street).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "");
  }

  constructor(private api: ApiService, private customer: CustomerService) {}

  // ngOnInit() {}
  public formSubmit() {
    console.log(this.control);
  }

  public onSelectShop(event) {
    console.log(event.option.value);
    const selectedCustomer = this.customersListForSearching.customers.find(
      (shop) => shop.shopName === event.option.value
    );
    this.bill.address = selectedCustomer.address;
    this.bill.city = selectedCustomer.city;
    this.bill.drugLic = selectedCustomer.drugLic;
    this.bill.gstin = selectedCustomer.gstin;
    this.bill.panNo = selectedCustomer.panNo;
    this.bill.phone = selectedCustomer.phone;
  }
}

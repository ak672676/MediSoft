import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { MedicineService } from "../medicine.service";
import { Router } from "@angular/router";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-add-medicine",
  templateUrl: "./add-medicine.component.html",
  styleUrls: ["./add-medicine.component.css"],
})
export class AddMedicineComponent implements OnInit {
  public newMedicine = {
    productName: "",
    pack: "",
    company: "",
    hsn: "",
  };
  control = new FormControl();
  public companies: string[] = [];
  filteredCompanies: Observable<string[]>;

  companiesListForSearching = <any>[];
  formError = "";
  constructor(private medicine: MedicineService, private router: Router) {}
  ngOnInit() {
    this.filteredCompanies = this.control.valueChanges.pipe(
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
      this.newMedicine.company = val;
      this.medicine.searchCompany(val).subscribe((data) => {
        this.companiesListForSearching = data;
        this.companies = this.companiesListForSearching.companies.map(
          (c) => c.company
        );
      });
    });
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.companies.filter((company) =>
      this._normalizeValue(company).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "");
  }

  public formSubmit() {
    this.formError = "";
    if (
      !this.newMedicine.company ||
      !this.newMedicine.pack ||
      !this.newMedicine.productName ||
      !this.newMedicine.hsn
    ) {
      this.formError = "All fileds are required.";
      return;
    }
    this.registerMedicine();
  }
  public registerMedicine() {
    this.formError = "";
    this.medicine.addMedicine(this.newMedicine).subscribe(
      (val) => {
        if (val["success"]) {
          this.router.navigate(["/"]);
          return;
        }
      },
      (err) => {
        this.formError = err.error.message;
      }
    );
  }
}

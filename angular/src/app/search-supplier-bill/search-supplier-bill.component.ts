import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SupplierService } from "../supplier.service";

@Component({
  selector: "app-search-supplier-bill",
  templateUrl: "./search-supplier-bill.component.html",
  styleUrls: ["./search-supplier-bill.component.css"],
})
export class SearchSupplierBillComponent implements OnInit {
  public suppliers = <any>[];
  public suppliersObjectArray = <any>[];
  keywordForSuppliers = "name";
  searchingForm: FormGroup;
  public selectedSupplier: any;
  constructor(private fb: FormBuilder, private supplier: SupplierService) {
    this.searchingForm = fb.group({
      supplier: [{ value: "", disabled: false }],
    });
  }
  ngOnInit(): void {}

  onSelectSupplier(select) {
    let i = this.suppliers.findIndex((s) => s === select);
    // console.log(this.suppliersObjectArray[i]);
    this.selectedSupplier = this.suppliersObjectArray[i];
  }
  onChangeSupplierSearch(query: string) {
    if (!query) return;
    this.supplier.searchSupplier(query).subscribe((sup: any) => {
      this.suppliersObjectArray = sup.suppliers;
      this.suppliers = sup.suppliers.map((s) => s.supplierName);
    });
  }
}

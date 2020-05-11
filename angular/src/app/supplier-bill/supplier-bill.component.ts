import { Component, OnInit } from "@angular/core";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../api.service";
import { MedicineService } from "../medicine.service";
import { SupplierService } from "../supplier.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-supplier-bill",
  templateUrl: "./supplier-bill.component.html",
  styleUrls: ["./supplier-bill.component.css"],
})
export class SupplierBillComponent implements OnInit {
  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  totalAmount = 0;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private medicine: MedicineService,
    private supplier: SupplierService,
    private router: Router
  ) {}
  keyword = "name";
  keywordForSuppliers = "name";

  public medicines = <any>[];
  public medicinesObjectArray = <any>[];

  public suppliers = <any>[];
  public suppliersObjectArray = <any>[];

  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      supplier: ["", Validators.required],
      supplierId: [""],
      invoiceNo: ["", Validators.required],
      tableRows: this.fb.array([]),
    });
    this.addNewItem();
  }

  ngAfterOnInit() {
    this.control = this.userTable.get("tableRows") as FormArray;
  }

  ngDoCheck() {
    this.totalAmount = 0;
    const control = this.userTable.get("tableRows") as FormArray;
    for (let i = 0; i < control.length; i++) {
      if (control.controls[i].valid) {
        let rate = Number(control.controls[i].get("rate").value);
        let sgst = Number(control.controls[i].get("sgst").value);
        let cgst = Number(control.controls[i].get("cgst").value);
        let quantity = Number(control.controls[i].get("quantity").value);
        let bonus = control.controls[i].get("bonus").value;
        let discount = Number(control.controls[i].get("discount").value);
        if (bonus) {
          let b = bonus.split("+");
          rate =
            (rate * Number(b[0]) * quantity) / (Number(b[0]) + Number(b[1]));
        } else {
          rate = rate * quantity;
        }
        let amount = rate + (rate * (sgst + cgst)) / 100;
        amount = amount - (amount * discount) / 100;
        this.totalAmount = this.totalAmount + amount;
        control.controls[i].get("amount").setValue(amount);
      }
    }
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      hsn: [""],
      productName: ["", Validators.required],
      company: [""],
      pack: [""],
      batch: [""],
      exp: [""],
      mrp: [""],
      rate: ["", Validators.required],
      quantity: ["", Validators.required],
      bonus: [""],
      sgst: ["", Validators.required],
      cgst: ["", Validators.required],
      trade: ["", Validators.required],
      discount: ["", Validators.required],
      amount: [""],
    });
  }

  addNewItem() {
    const control = this.userTable.get("tableRows") as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.userTable.get("tableRows") as FormArray;
    control.removeAt(index);
  }

  get getFormControls() {
    const control = this.userTable.get("tableRows") as FormArray;
    return control;
  }

  submitForm() {
    // const control = this.userTable.get("tableRows") as FormArray;
    // this.touchedRows = control.controls
    //   .filter((row) => row.touched)
    //   .map((row) => row.value);
    // console.log(this.touchedRows);
    console.log(this.userTable.value);
    this.userTable.value.total = this.totalAmount;
    this.supplier.addSupplierBill(this.userTable.value).subscribe(
      (val) => {
        console.log(val);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onChangeSearch(query: string) {
    if (!query) return;
    this.medicine.searchMedicine(query).subscribe((med: any) => {
      this.medicinesObjectArray = med.medicines;
      this.medicines = med.medicines.map((m) => m.productName);
    });
  }
  onSelectProduct(select, index) {
    let i = this.medicines.findIndex((m) => m === select);
    const control = this.userTable.get("tableRows") as FormArray;
    control.controls[index]
      .get("company")
      .setValue(this.medicinesObjectArray[i]["company"]);
    control.controls[index]
      .get("pack")
      .setValue(this.medicinesObjectArray[i]["pack"]);
    control.controls[index]
      .get("hsn")
      .setValue(this.medicinesObjectArray[i]["hsn"]);
  }
  onSelectSupplier(select) {
    let i = this.suppliers.findIndex((s) => s === select);
    this.userTable.controls["supplierId"].setValue(
      this.suppliersObjectArray[i]["_id"]
    );
  }
  onChangeSupplierSearch(query: string) {
    if (!query) return;
    this.supplier.searchSupplier(query).subscribe((sup: any) => {
      this.suppliersObjectArray = sup.suppliers;
      this.suppliers = sup.suppliers.map((s) => s.supplierName);
    });
  }
}

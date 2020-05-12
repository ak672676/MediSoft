import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-supplier-bill-list",
  templateUrl: "./supplier-bill-list.component.html",
  styleUrls: ["./supplier-bill-list.component.css"],
})
export class SupplierBillListComponent implements OnInit {
  @Input() public supplier;
  constructor() {}
  public selectedSupplier: any = null;
  public isSelected: boolean = false;
  ngOnInit(): void {}
  ngOnChanges() {
    if (this.supplier) {
      console.log("============");
      console.log(this.supplier);
      this.selectedSupplier = this.supplier;
      this.isSelected = true;
      return;
    }
  }
}

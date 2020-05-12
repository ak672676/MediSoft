import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../api.service";
@Component({
  selector: "app-supplier-bill-view",
  templateUrl: "./supplier-bill-view.component.html",
  styleUrls: ["./supplier-bill-view.component.css"],
})
export class SupplierBillViewComponent implements OnInit {
  loading: boolean = false;
  bill: any = null;
  billFound: boolean = false;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      let requestObject = {
        method: "GET",
        location: `api/suppliers/bill/${params.id}`,
      };

      this.api.makeRequest(requestObject).then((val) => {
        if (val.bill) {
          console.log(val);
          this.bill = val.bill;
          this.billFound = true;
          // this.router.navigate(["/dashboard"]);
          return;
        } else {
          this.billFound = false;
        }

        // if (val.message) {
        //   this.formError = val.error.message;
        // }
      });

      this.loading = false;
    });
  }
}

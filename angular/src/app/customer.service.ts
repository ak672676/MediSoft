import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient, private storage: LocalStorageService) {}
  // public customers = <any>[];
  public searchCustomer(bill) {
    if (!bill.buyerName) return;

    let httpOptions = {};
    if (this.storage.getToken()) {
      httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storage.getToken()}`,
        }),
      };
    }

    return this.http.get(
      `http://localhost:5000/api/customers/getCustomer/${bill.buyerName}`,
      httpOptions
    );
  }
}

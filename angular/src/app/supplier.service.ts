import { Injectable } from "@angular/core";
// import { ApiService } from "./api.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
@Injectable({
  providedIn: "root",
})
export class SupplierService {
  constructor(private http: HttpClient, private storage: LocalStorageService) {}
  // public customers = <any>[];

  public searchSupplier(query) {
    if (!query) return;

    let httpOptions = {};
    if (this.storage.getToken()) {
      httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storage.getToken()}`,
        }),
      };
    }

    return this.http.get(
      `http://localhost:5000/api/suppliers/searchSupplier/${query}`,
      httpOptions
    );
  }

  public addSupplierBill(body: any) {
    console.log("-----------");
    if (!body) return;
    let httpOptions = {};
    console.log(body);
    if (this.storage.getToken()) {
      httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storage.getToken()}`,
        }),
      };
    }
    console.log("11111");
    return this.http.post(
      "http://localhost:5000/api/suppliers/addBill",
      body,
      httpOptions
    );
  }
}

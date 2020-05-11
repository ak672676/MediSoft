import { Injectable } from "@angular/core";
// import { ApiService } from "./api.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
@Injectable({
  providedIn: "root",
})
export class MedicineService {
  constructor(private http: HttpClient, private storage: LocalStorageService) {}
  // public customers = <any>[];
  public searchCompany(query) {
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
      `http://localhost:5000/api/medicines/searchCompany/${query}`,
      httpOptions
    );
  }

  public addMedicine(newMedicine) {
    let httpOptions = {};
    if (this.storage.getToken()) {
      httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storage.getToken()}`,
        }),
      };
    }

    return this.http.post(
      "http://localhost:5000/api/medicines/addMedicine",
      newMedicine,
      httpOptions
    );
  }

  public searchMedicine(query) {
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
      `http://localhost:5000/api/medicines/searchMedicine/${query}`,
      httpOptions
    );
  }
}

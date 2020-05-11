import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "http://localhost:5000";

  constructor(private http: HttpClient, private storage: LocalStorageService) {}
  private successHandler(value) {
    return value;
  }

  private errorHandler(value) {
    return value;
  }
  public makeRequest(requestObject): any {
    let method = requestObject.method.toLowerCase();
    if (!method) {
      return console.log("No method specified in the request object");
    }
    let body = requestObject.body || {};

    let location = requestObject.location;

    if (!location) {
      return console.log("No location specified in the request");
    }

    let url = `${this.baseUrl}/${location}`;

    let httpOptions = {};

    if (this.storage.getToken()) {
      httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storage.getToken()}`,
        }),
      };
    }

    if (method === "get") {
      return this.http
        .get(url, httpOptions)
        .toPromise()
        .then(this.successHandler)
        .catch(this.errorHandler);
    }

    if (method === "post") {
      return this.http
        .post(url, body, httpOptions)
        .toPromise()
        .then(this.successHandler)
        .catch(this.errorHandler);
    }
    console.log(
      "Could not make the request.Make sure a method of GET or POST is supplied"
    );
  }
}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatOptionModule } from "@angular/material/core";

import { InputAutocompleteComponent } from "./input-autocomplete/input-autocomplete.component";
import { AutocompleteLibModule } from "angular-ng-autocomplete";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./_app/app.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { AddRetailComponent } from "./add-retail/add-retail.component";
import { BillingComponent } from "./billing/billing.component";
import { RegisterComponent } from "./register/register.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddMedicineComponent } from "./add-medicine/add-medicine.component";
import { AddSupplierComponent } from "./add-supplier/add-supplier.component";
import { SupplierBillComponent } from "./supplier-bill/supplier-bill.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TopbarComponent,
    AddRetailComponent,
    BillingComponent,
    RegisterComponent,
    AddMedicineComponent,
    AddSupplierComponent,
    SupplierBillComponent,
    InputAutocompleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    AutocompleteLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

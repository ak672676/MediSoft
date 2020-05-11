import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthService } from "./auth.service";

import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddRetailComponent } from "./add-retail/add-retail.component";
import { BillingComponent } from "./billing/billing.component";
import { RegisterComponent } from "./register/register.component";
import { AddMedicineComponent } from "./add-medicine/add-medicine.component";
import { AddSupplierComponent } from "./add-supplier/add-supplier.component";
import { SupplierBillComponent } from "./supplier-bill/supplier-bill.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [AuthService],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthService],
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AuthService],
    data: { loggedIn: true },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthService],
    data: { loggedIn: true },
  },
  {
    path: "addRetailCustomer",
    component: AddRetailComponent,
    canActivate: [AuthService],
    data: { loggedIn: true },
  },
  {
    path: "billing",
    component: BillingComponent,
    canActivate: [AuthService],
    data: { loggedIn: true },
  },
  {
    path: "addMedicine",
    component: AddMedicineComponent,
    canActivate: [AuthService],
    data: { loggedIn: true },
  },
  {
    path: "addSupplier",
    component: AddSupplierComponent,
    canActivate: [AuthService],
    data: { loggedIn: true },
  },
  {
    path: "addSupplierBill",
    component: SupplierBillComponent,
    canActivate: [AuthService],
    data: { loggedIn: true },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

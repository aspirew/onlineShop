import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router'
import { MaterialModule } from './material/material.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProductsComponent } from './components/products/products.component';
import { BookVisitComponent } from './components/book-visit/book-visit.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import paths from '../routes/paths';
import { ContactComponent } from './components/contact/contact.component';
import { DeliveryDataComponent } from './components/delivery-data/delivery-data.component';
import { VisitsComponent } from './components/visits/visits.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthService } from './services/auth.service'

import { UtilsService } from './services/utils.service'
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { LogoutComponent } from './components/logout/logout.component';
import { ProductComponent } from './components/product/product.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { ReservationsAdminComponent } from './components/reservations-admin/reservations-admin.component';
import { OrdersAdminComponent } from './components/orders-admin/orders-admin.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { OrderComponent } from './components/order/order.component';
import { NewProductComponent } from './new-product/new-product.component';
import { AdminNewProductComponent } from './components/admin-new-product/admin-new-product.component';
import { CartPromptComponent } from './components/cart-prompt/cart-prompt.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ProductsComponent,
    BookVisitComponent,
    ContactComponent,
    DeliveryDataComponent,
    VisitsComponent,
    ChangePasswordComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProductComponent,
    PageNotFoundComponent,
    CartComponent,
    AdminLoginComponent,
    DashboardComponent,
    ProductsAdminComponent,
    ReservationsAdminComponent,
    OrdersAdminComponent,
    AdminUsersComponent,
    OrderComponent,
    NewProductComponent,
    AdminNewProductComponent,
    CartPromptComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot(paths),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialFileInputModule
  ],
  providers: [UtilsService, AuthService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

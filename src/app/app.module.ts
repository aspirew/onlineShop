import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router'
import { MaterialModule } from './material/material.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProductsComponent } from './products/products.component';
import { BookVisitComponent } from './book-visit/book-visit.component';

import paths from '../routes/paths';
import { ContactComponent } from './contact/contact.component';
import { DeliveryDataComponent } from './delivery-data/delivery-data.component';
import { VisitsComponent } from './visits/visits.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductFieldComponent } from './product-field/product-field.component'

import { AuthService } from './auth.service'

import { UtilsService } from './utils.service'
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';

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
    ProductFieldComponent
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
    HttpClientModule
  ],
  providers: [UtilsService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

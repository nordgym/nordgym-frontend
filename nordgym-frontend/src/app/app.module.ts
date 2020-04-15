import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptor/http-error-interceptor';
import { OrderManagementComponent } from './management/order-management/order-management.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { IndexComponent } from './index/index.component';
import { UserManagementComponent } from './management/user-management/user-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductManagementComponent } from './management/product-management/product-management.component';
import { NewProductFormComponent } from './new-product-form/new-product-form.component';
import { UsersComponent } from './users/users.component';
import {AlertModule} from './module/alert.module';
import {MaterialUiModule} from './module/material-ui.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { OpenOrdersComponent } from './open-orders/open-orders.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MembershipManagementComponent } from './management/membership-management/membership-management.component';
import { MembershipsComponent } from './memberships/memberships.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderManagementComponent,
    SideNavComponent,
    IndexComponent,
    UserManagementComponent,
    ProductManagementComponent,
    NewProductFormComponent,
    UsersComponent,
    OpenOrdersComponent,
    MembershipManagementComponent,
    MembershipsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    MaterialUiModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatExpansionModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

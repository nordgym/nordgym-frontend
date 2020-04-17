import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptor/http-error-interceptor';
import { OrdersComponent } from './orders/orders.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { IndexComponent } from './index/index.component';
import {UsersComponent} from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { NewProductFormComponent } from './products/new-product-form/new-product-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import {AlertModule} from './alert/alert.module';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { MembershipListComponent } from './memberships/membership-list/membership-list.component';
import {MaterialUiModule} from './material-ui/material-ui.module';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    SideNavComponent,
    IndexComponent,
    ProductsComponent,
    NewProductFormComponent,
    UsersComponent,
    UserListComponent,
    OrderListComponent,
    MembershipsComponent,
    MembershipListComponent,
    UserProfileComponent,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

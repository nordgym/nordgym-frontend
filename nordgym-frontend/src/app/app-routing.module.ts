import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders/orders.component';
import {IndexComponent} from './index/index.component';
import {UsersComponent} from './users/users.component';
import {ProductsComponent} from './products/products.component';
import {NewProductFormComponent} from './products/new-product-form/new-product-form.component';
import {MembershipsComponent} from './memberships/memberships.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'index'
  },
  {path: 'index', component: IndexComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'users', component: UsersComponent},
  {path: 'memberships', component: MembershipsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'new-product', component: NewProductFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

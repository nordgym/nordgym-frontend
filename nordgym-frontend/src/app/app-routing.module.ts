import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders/orders.component';
import {IndexComponent} from './index/index.component';
import {UsersComponent} from './users/users.component';
import {ProductsComponent} from './products/products.component';
import {NewProductFormComponent} from './products/new-product-form/new-product-form.component';
import {MembershipsComponent} from './memberships/memberships.component';
import {UserProfileComponent} from './users/user-profile/user-profile.component';


const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'orders', component: OrdersComponent},
  {
    path: 'users',
    children: [
      {path: '', component: UsersComponent},
      {path: 'profile/:id', component: UserProfileComponent}
    ]
  },
  {path: 'memberships', component: MembershipsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'new-product', component: NewProductFormComponent},
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'index'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

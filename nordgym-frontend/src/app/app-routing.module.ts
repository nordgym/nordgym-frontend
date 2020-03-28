import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderManagementComponent } from './management/order-management/order-management.component';
import { IndexComponent } from './index/index.component';
import {UserManagementComponent} from './management/user-management/user-management.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'index'
},
  { path: 'index', component: IndexComponent},
  { path: 'order', component: OrderManagementComponent },
  { path: 'user', component: UserManagementComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

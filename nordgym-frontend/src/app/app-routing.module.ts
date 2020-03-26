import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderManagementComponent } from './order-management/order-management.component';
import { IndexComponent } from './index/index.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'index'
},
  { path: 'index', component: IndexComponent},
  { path: 'order', component: OrderManagementComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    data: { title: 'List of Orders' },
  },
  {
    path: 'order-details/:id',
    component: OrderDetailComponent,
    data: { title: 'Order Details' },
  },
  {
    path: 'order-add',
    component: OrderAddComponent,
    data: { title: 'Add Order' },
  },
  {
    path: 'order-edit/:id',
    component: OrderEditComponent,
    data: { title: 'Edit Order' },
  },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: '**', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppRoutingModule {}

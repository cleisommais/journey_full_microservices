import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsumersComponent } from './consumers/consumers.component';
import { ConsumerDetailComponent } from './consumer-detail/consumer-detail.component';
import { ConsumerAddComponent } from './consumer-add/consumer-add.component';
import { ConsumerEditComponent } from './consumer-edit/consumer-edit.component';

const routes: Routes = [
  {
    path: 'consumers',
    component: ConsumersComponent,
    data: { title: 'List of Consumers' },
  },
  {
    path: 'consumer-details/:id',
    component: ConsumerDetailComponent,
    data: { title: 'Consumer Details' },
  },
  {
    path: 'consumer-add',
    component: ConsumerAddComponent,
    data: { title: 'Add Consumer' },
  },
  {
    path: 'consumer-edit/:id',
    component: ConsumerEditComponent,
    data: { title: 'Edit Consumer' },
  },
  { path: '', redirectTo: '/consumers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

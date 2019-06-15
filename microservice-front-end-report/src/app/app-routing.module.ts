import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: 'reports',
    component: ReportsComponent,
    data: { title: 'Dashboard/Reports' },
  },
  { path: '', redirectTo: '/reports', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

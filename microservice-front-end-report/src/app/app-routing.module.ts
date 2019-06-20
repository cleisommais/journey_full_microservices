import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  {
    path: 'reports',
    component: ReportsComponent,
    data: { title: 'Dashboard/Reports' },
  },
  { path: '', redirectTo: '/reports', pathMatch: 'full' },
  { path: '**', component: ReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppRoutingModule {}

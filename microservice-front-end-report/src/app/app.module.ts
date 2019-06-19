import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportsComponent } from './reports/reports.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatCardModule, MatSnackBarModule } from '@angular/material';
import { GoogleChartsModule } from 'angular-google-charts';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
@NgModule({
  declarations: [AppComponent, ReportsComponent, EmptyRouteComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report-service/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  titleQuantOrderByConsumer = 'Quantity Orders by Consumer';
  titleQuantProductByOrder = 'Quantity Products by Order';
  type = 'ColumnChart';
  columnNamesQuantOrderByConsumer = ['firstName', 'quantity'];
  columnNamesQuantProductByOrder = ['name', 'quantity'];
  options = {
    is3D: true,
    animation: {
      startup: true,
      duration: 1000,
      easing: 'inAndOut',
    },
  };
  width = '50%';
  height = '300';
  isLoadingResults = true;
  dataQuantOrderByConsumer: any[] = [];
  dataQuantProductByOrder: any[] = [];

  constructor(private api: ReportService) {}

  ngOnInit() {
    this.api.getReports().subscribe(
      res => {
        let quantOrderByConsumer = [];
        quantOrderByConsumer = res['quantOrderByConsumer'];
        quantOrderByConsumer.forEach(element => {
          this.dataQuantOrderByConsumer.push([element.firstName, element.quantity]);
        });
        let quantProductByOrder = [];
        quantProductByOrder = res['quantProductByOrder'];
        quantProductByOrder.forEach(element => {
          this.dataQuantProductByOrder.push([element.name, element.quantity]);
        });
        this.isLoadingResults = false;
      },
      err => {
        console.error(err);
        this.isLoadingResults = false;
      }
    );
  }
}

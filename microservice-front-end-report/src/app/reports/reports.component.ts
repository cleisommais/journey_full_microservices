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
  columnNamesQuantOrderByConsumer = ['firstName', 'quantity'];
  columnNamesQuantProductByOrder = ['name', 'quantity'];
  options = {
    is3D: true,
    colors: ['#e0440e'],
    animation: {
      startup: true,
      duration: 1000,
      easing: 'inAndOut',
    },
  };
  height = '300';
  isLoadingResults = true;
  dataQuantOrderByConsumer: Array<Array<any>> = [['', 0]];
  dataQuantProductByOrder: Array<Array<any>> = [['', 0]];

  constructor(private api: ReportService) {
    this.api
      .getReports()
      .toPromise()
      .then(res => {
        let quantOrderByConsumer = [];
        quantOrderByConsumer = res['quantOrderByConsumer'];
        this.dataQuantOrderByConsumer.shift();
        quantOrderByConsumer.forEach(element => {
          this.dataQuantOrderByConsumer.push([element.firstName, parseInt(element.quantity)]);
        });
        let quantProductByOrder = [];
        quantProductByOrder = res['quantProductByOrder'];
        this.dataQuantProductByOrder.shift();
        quantProductByOrder.forEach(element => {
          this.dataQuantProductByOrder.push([element.name, parseInt(element.quantity)]);
        });
        this.isLoadingResults = false;
      });
  }

  ngOnInit() {}
}

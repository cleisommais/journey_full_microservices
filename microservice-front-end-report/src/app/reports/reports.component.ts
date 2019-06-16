import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report-service/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  title = 'Browser market shares at a specific website, 2014';
  type = 'ColumnChart';
  columnNames = ['Browser', 'Percentage'];
  options = {
    is3D: true,
    animation: {
      startup: true,
      duration: 1000,
      easing: 'inAndOut',
    },
  };
  width = 850;
  height = 400;
  isLoadingResults = true;
  data: any[] = [];

  constructor(private api: ReportService) {}

  ngOnInit() {
    this.data = [['Firefox', 45.0], ['IE', 26.8], ['Chrome', 12.8], ['Safari', 8.5], ['Opera', 6.2], ['Others', 0.7]];
    this.api.getReports().subscribe(
      res => {
        this.data = res;
        this.isLoadingResults = false;
      },
      err => {
        console.error(err);
        this.isLoadingResults = false;
      }
    );
  }
}

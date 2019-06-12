import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../consumer-service/consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.css'],
})
export class ConsumersComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'firstName', 'lastName', 'email'];
  data: Consumer[] = [];
  isLoadingResults = true;

  constructor(private api: ConsumerService) {}

  ngOnInit() {
    this.api.getConsumers().subscribe(
      res => {
        this.data = res.slice();
        console.log(this.data);
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}

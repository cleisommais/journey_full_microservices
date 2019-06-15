import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order-service/order.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'consumerName', 'productName', 'quantity'];
  data: Order[] = [];
  isLoadingResults = true;

  constructor(private api: OrderService) {}

  ngOnInit() {
    this.api.getOrders().subscribe(
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

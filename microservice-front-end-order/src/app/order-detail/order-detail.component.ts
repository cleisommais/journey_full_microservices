import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { OrderService } from '../order-service/order.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  order: Order = {
    _id: null,
    consumer_id: null,
    product_id: null,
    quantity: null,
    date: '',
    consumerName: '',
    productName: '',
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: OrderService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getOrderDetails(this.route.snapshot.params['id']);
  }

  getOrderDetails(id) {
    this.api.getOrder(id).subscribe(data => {
      this.order = data;
      console.log(this.order);
      this.isLoadingResults = false;
    });
  }

  deleteOrder(id) {
    this.isLoadingResults = true;
    this.api.deleteOrder(id).subscribe(
      res => {
        this.openSnackBar('Order deleted', 'Info');
        this.isLoadingResults = false;
        this.router.navigate(['/orders']);
      },
      err => {
        console.log(err);
        this.openSnackBar(err.error.message.errmsg, 'Error');
        this.isLoadingResults = false;
      }
    );
  }

  openSnackBar(message: any, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: '',
    });
  }
}

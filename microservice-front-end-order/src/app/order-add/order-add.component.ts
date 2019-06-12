import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order-service/order.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Consumer } from '../model/consumer';
import { Product } from '../model/product';
import { Order } from '../model/order';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
})
export class OrderAddComponent implements OnInit {
  orderForm: FormGroup;
  consumers: Consumer[] = [];
  products: Product[] = [];
  consumer_id: number = null;
  consumerName: string = '';
  product_id: number = null;
  productName: string = '';
  quantity: number = null;
  isLoadingResults = false;

  constructor(private formBuilder: FormBuilder, private api: OrderService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      consumer_id: [null, Validators.required],
      product_id: [null, Validators.required],
      quantity: [null, Validators.required],
    });
    this.api.getConsumers().subscribe(
      res => {
        this.consumers = res;
      },
      err => {
        console.error(err);
      }
    );
    this.api.getProducts().subscribe(
      res => {
        this.products = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    let formData = Object.assign({});
    formData = Object.assign(form, Order);
    formData.consumerName = this.consumerName;
    formData.productName = this.productName;
    this.api.addOrder(formData).subscribe(
      res => {
        let id = res['_id'];
        this.openSnackBar('Order added Nº ' + id, 'Info');
        this.isLoadingResults = false;
        this.router.navigate(['/order-details', id]);
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

  onChangeConsumer(event) {
    let target = event.source.selected._element.nativeElement;
    this.consumerName = target.innerText.trim();
  }

  onChangeProduct(event) {
    let target = event.source.selected._element.nativeElement;
    this.productName = target.innerText.trim();
  }
}

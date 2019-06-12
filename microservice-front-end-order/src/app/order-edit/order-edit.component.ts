import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { OrderService } from '../order-service/order.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Consumer } from '../model/consumer';
import { Product } from '../model/product';
import { Order } from '../model/order';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css'],
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;
  _id: number = null;
  consumers: Consumer[] = [];
  products: Product[] = [];
  consumer_id: number = null;
  consumerName: string = '';
  product_id: number = null;
  productName: string = '';
  quantity: number = null;
  isLoadingResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private api: OrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getOrder(this.route.snapshot.params['id']);
    this.orderForm = this.formBuilder.group({
      consumer_id: [null, Validators.required],
      product_id: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    let formData = Object.assign({});
    formData = Object.assign(form, Order);
    formData.consumerName = this.consumerName;
    formData.productName = this.productName;
    this.api.updateOrder(this._id, formData).subscribe(
      res => {
        let id = res['_id'];
        this.openSnackBar('Order updated', 'Info');
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

  orderDetails() {
    this.router.navigate(['/order-details', this._id]);
  }

  getOrder(id) {
    let order = this.api.getOrder(id);
    let consumers = this.api.getConsumers();
    let product = this.api.getProducts();
    forkJoin([order, consumers, product]).subscribe(
      res => {
        this._id = res[0]._id;
        this.consumerName = res[0].consumerName;
        this.productName = res[0].productName;
        this.orderForm.setValue({
          consumer_id: res[0].consumer_id,
          product_id: res[0].product_id,
          quantity: res[0].quantity,
        });
        this.consumers = res[1];
        this.products = res[2];
      },
      err => {
        console.error(err);
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

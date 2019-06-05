import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product-service/product.service';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  _id: number = null;
  name: string = '';
  value: number = null;
  quantity: number = null;
  isLoadingResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private api: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      value: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateProduct(this._id, form).subscribe(
      res => {
        this.openSnackBar('Product updated', 'Info');
        let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/product-details', id]);
      },
      err => {
        this.openSnackBar(err.error.message.errmsg, 'Error');
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  productDetails() {
    this.router.navigate(['/product-details', this._id]);
  }

  getProduct(id) {
    this.api.getProduct(id).subscribe(data => {
      this._id = data._id;
      this.productForm.setValue({
        name: data.name,
        value: data.value,
        quantity: data.quantity,
      });
    });
  }

  openSnackBar(message: any, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product-service/product.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  name: string = '';
  value: number = null;
  quantity: number = null;
  isLoadingResults = false;

  constructor(private formBuilder: FormBuilder, private api: ProductService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      value: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addProduct(form).subscribe(
      res => {
        this.openSnackBar('Product added', 'Info');
        let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/product-details', id]);
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
    });
  }
}

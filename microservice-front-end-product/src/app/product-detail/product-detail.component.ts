import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product-service/product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    _id: null,
    name: '',
    value: null,
    quantity: null,
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ProductService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getProductDetails(this.route.snapshot.params['id']);
  }

  getProductDetails(id) {
    this.api.getProduct(id).subscribe(data => {
      this.product = data;
      console.log(this.product);
      this.isLoadingResults = false;
    });
  }

  deleteProduct(id) {
    this.isLoadingResults = true;
    this.api.deleteProduct(id).subscribe(
      res => {
        this.openSnackBar('Product deleted', 'Info');
        this.isLoadingResults = false;
        this.router.navigate(['/products']);
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

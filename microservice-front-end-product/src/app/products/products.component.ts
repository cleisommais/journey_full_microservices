import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service/product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'name', 'value', 'quantity'];
  data: Product[] = [];
  isLoadingResults = true;

  constructor(private api: ProductService) {}

  ngOnInit() {
    this.api.getProducts().subscribe(
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

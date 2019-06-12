import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from '../consumer-service/consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'app-consumer-detail',
  templateUrl: './consumer-detail.component.html',
  styleUrls: ['./consumer-detail.component.css'],
})
export class ConsumerDetailComponent implements OnInit {
  consumer: Consumer = {
    _id: null,
    firstName: '',
    lastName: null,
    email: null,
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ConsumerService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getConsumerDetails(this.route.snapshot.params['id']);
  }

  getConsumerDetails(id) {
    this.api.getConsumer(id).subscribe(data => {
      this.consumer = data;
      console.log(this.consumer);
      this.isLoadingResults = false;
    });
  }

  deleteConsumer(id) {
    this.isLoadingResults = true;
    this.api.deleteConsumer(id).subscribe(
      res => {
        this.openSnackBar('Consumer deleted', 'Info');
        this.isLoadingResults = false;
        this.router.navigate(['/consumers']);
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

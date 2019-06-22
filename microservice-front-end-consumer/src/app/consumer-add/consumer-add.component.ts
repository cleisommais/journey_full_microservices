import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerService } from '../consumer-service/consumer.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consumer-add',
  templateUrl: './consumer-add.component.html',
  styleUrls: ['./consumer-add.component.css'],
})
export class ConsumerAddComponent implements OnInit {
  consumerForm: FormGroup;
  firstName: string = '';
  lastName: number = null;
  email: number = null;
  isLoadingResults = false;

  constructor(private formBuilder: FormBuilder, private api: ConsumerService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.consumerForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addConsumer(form).subscribe(
      res => {
        this.openSnackBar('Consumer added', 'Info');
        let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/consumer-details', id]);
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

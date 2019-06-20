import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from '../consumer-service/consumer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-consumer-edit',
  templateUrl: './consumer-edit.component.html',
  styleUrls: ['./consumer-edit.component.css'],
})
export class ConsumerEditComponent implements OnInit {
  consumerForm: FormGroup;
  _id: number = null;
  firstName: string = '';
  lastName: number = null;
  email: number = null;
  isLoadingResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private api: ConsumerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getConsumer(this.route.snapshot.params['id']);
    this.consumerForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateConsumer(this._id, form).subscribe(
      res => {
        this.openSnackBar('Consumer updated', 'Info');
        let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/consumer-details', id]);
      },
      err => {
        this.openSnackBar(err.error.message.errmsg, 'Error');
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  consumerDetails() {
    this.router.navigate(['/consumer-details', this._id]);
  }

  getConsumer(id) {
    this.api.getConsumer(id).subscribe(data => {
      this._id = data._id;
      this.consumerForm.setValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
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

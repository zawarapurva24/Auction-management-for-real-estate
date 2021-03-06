import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateAuctionService } from './create-auction.service';
import { dateValidator } from '../validators/date.validtor';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {
  createAuctionFormGroup: FormGroup;
  loading = false;
  submitted = false;
  uploadedFiles = [];
  uploadError;
  currentStatus: number;
  uploadFieldName = 'photos';
  resp: string;
  fileToUpload: File;

  constructor(
    private formBuilder: FormBuilder,
    private createAuctionService: CreateAuctionService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createAuctionFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      property_type: [''],
      address: ['', Validators.required],
      description: ['', Validators.required],
      min_starting_bid: ['', Validators.required],
      bid_value_multiple: ['', Validators.required],
      expiry_date: ['', dateValidator()],
      property_image: ['', Validators.required]
    });
  }

  get f() { return this.createAuctionFormGroup.controls; }

  onFileSelect($event) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.fileToUpload = file;
    }
  }

  onItemChange($event) {
    const formData = new FormData();
    const type = $event.target.value;
    formData.append('property_type', type);
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clearAlert();
    if (this.createAuctionFormGroup.invalid) {
      return;
    }
    const formValues = this.createAuctionFormGroup.value;
    formValues.property_image = this.fileToUpload;
    formValues.property_image_type = this.fileToUpload.type;
    this.createAuctionService.submit(formValues)
      .pipe(first())
      .subscribe(
        (res) => {
          this.alertService.success(res.message, true);
          this.router.navigate(['/home']);
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400 || err.status === 500) {
              console.log(err.error.message);
              this.alertService.error(err.error.message);
            } else {
              return alert('An unexpected error occured');
            }
          }
        });
  }
}

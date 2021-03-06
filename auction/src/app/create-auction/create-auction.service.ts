import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CreateAuctionService {
  error: string;
  constructor(
    private httpClient: HttpClient,
  ) { }

  submit(formValues) {
    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('property_type', formValues.property_type);
    formData.append('address', formValues.address);
    formData.append('description', formValues.description);
    formData.append('min_starting_bid', formValues.min_starting_bid);
    formData.append('bid_value_multiple', formValues.bid_value_multiple);
    formData.append('expiry_date', formValues.expiry_date);
    formData.append('property_image', formValues.property_image, formValues.property_image.name);
    formData.append('property_image_type', formValues.property_image_type);
    formData.append('user_id', localStorage.getItem('user_id'));
    return this.httpClient.post<any>(environment.createAuctionurl, formData);
  }
}

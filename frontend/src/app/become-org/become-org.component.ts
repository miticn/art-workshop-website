import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Workshop } from '../models/workshop';
import { Address } from 'ngx-google-places-autocomplete/objects/address';




declare var google: any;


@Component({
  selector: 'app-become-org',
  templateUrl: './become-org.component.html',
  styleUrls: ['./become-org.component.css']
})
export class BecomeOrgComponent implements OnInit {

  orgForm = new FormGroup({
    organizationName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
    matNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
    country: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern("[A-Z][a-zA-Z ]*")]),
    city: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z ]*$")]),
    postNumber: new FormControl('', [Validators.required, Validators.maxLength(10) , Validators.pattern("[0-9A-Z]*")]),
    street: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    streetNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*([a-zA-Z]\.? ?)*$")]),
  });
  constructor() { }
  workshop : Workshop = new Workshop();
  ngOnInit(): void {
    
  }

  location: Address;

  handleAddressChange(address: Address) {
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
  }




  
}

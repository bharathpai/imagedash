import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  zone_data: any[] = [];

  constructor(private fb: FormBuilder) { }
  details: FormGroup = this.fb.group({
    network_operator: [''],
    zone_details: this.fb.group({
      zone: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    })
  })

  ngOnInit(): void {
  }

  // Function to add an element details to zone_data.
  add() {
    // if (this.zone_data[0].length == 0) {
    //   this.zone_data = []
    // }
    this.zone_data.push(this.details.value)
    console.log(this.zone_data);

  }

  // Function to remove an item from zone_data.
  remove(data) {
    this.zone_data.splice(this.zone_data.indexOf(data), 1);
  }
}
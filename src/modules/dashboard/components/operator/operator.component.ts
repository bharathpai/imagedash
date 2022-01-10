import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  zone_details: any[] = [];

  constructor(private fb: FormBuilder) { }
  details: FormGroup = this.fb.group({
    operator: [''],
    zone: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
  })

  ngOnInit(): void {
  }

  // Function to add an element details to zone_details.
  add() {
    this.zone_details.push(this.details.value)
  }

  // Function to remove an item from zone_details.
  remove(data) {
    this.zone_details.splice(this.zone_details.indexOf(data), 1);
  }
}
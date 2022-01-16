import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperatorService } from 'src/app/services/operator.service';
@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  zone_data: any[] = [];
  btnText: any = ["Add", `<i class="bi bi-trash-fill"></i>`]

  constructor(private fb: FormBuilder, private op: OperatorService) { }
  details: FormGroup = this.fb.group({
    network_operator: [''],
    zone_details: this.fb.group({
      zone_name: ['', [Validators.required, Validators.pattern(/^(Zone)+\s[1-9]+$/)]],
      zone_price: ['', [Validators.required, Validators.pattern(/^[+-]?([1-9]+\.?[0-9]*|\.[0-9]+)$/)]]
    })
  })

  ngOnInit(): void {

  }

  // Function to add an element details to zone_data.
  add() {
    this.zone_data.push(this.details.value)
    this.op.networkOperator.next(this.zone_data)
  }

  // Function to remove an item from zone_data.
  remove(data) {
    this.zone_data.splice(this.zone_data.indexOf(data), 1);
    this.op.networkOperator.next(this.zone_data)
  }
}
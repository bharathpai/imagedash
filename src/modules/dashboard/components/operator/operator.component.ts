import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  details: FormGroup = this.fb.group({
    zone: ['', Validators.required],
    price: ['', Validators.required]
  })
  ngOnInit(): void {
  }

}

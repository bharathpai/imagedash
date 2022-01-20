import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor() { }

  networkOperator = new ReplaySubject<any>()

}
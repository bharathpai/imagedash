import { Injectable, OnInit } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { map, Observable, of, delay } from 'rxjs';
import { FetchService } from './fetch.service';
import { OperatorService } from './operator.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService implements OnInit {

  constructor(private fetch: FetchService, private op: OperatorService) { }
  ngOnInit(): void {
  }

  data: any = this.fetch.getData()

  checkNcExists(): Observable<any> {
    // console.log(this.data);
    return of(this.fetch.nc)
  }

  ncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkNcExists().pipe(
        map((res) => {
          // console.log(res);
          return res.includes(control.value) ? null : { ncExists: false };
        })
      );
    };
  }

  // zoneValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //      this.op.networkOperator.subscribe((data)=>{
  //       data
        
  //     })
  //     )
  //   }
  // }

}

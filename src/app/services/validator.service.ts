import { Injectable, OnInit } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { map, Observable, of, delay } from 'rxjs';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService implements OnInit {

  constructor(private fetch: FetchService) { }
  ngOnInit(): void {
  }

  data: any = this.fetch.getData()

  checkNcExists(code: number): Observable<boolean> {
    // console.log(this.data);
    return of(this.fetch.nc.includes(code))
  }

  ncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkNcExists(control.value).pipe(
        map((res) => {
          // console.log(control);
          return res ? null : { ncExists: true };
        })
      );
    };
  }

}

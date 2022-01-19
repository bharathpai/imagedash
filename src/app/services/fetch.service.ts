import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  baseUrl1: string = 'https://imagedash.s3.ap-south-1.amazonaws.com/mnc.json'
  baseUrl2: string = 'https://imagedash.s3.ap-south-1.amazonaws.com/Network_code_list.xlsx'
  baseUrl3: string = 'https://imagedash.s3.ap-south-1.amazonaws.com/Tariff+sheet.xlsx'
  constructor(private http: HttpClient) { }
  nc: any = []

  getData() {
    this.http.get('assets/mnc.json').subscribe((data) => {
      this.nc = []
      for (let i in data) {
        this.nc.push(parseInt(data[i]['Network Code']))
      }
      console.log(this.nc);
      return this.nc
    })
  }
  
}
import { Component, OnInit, Input } from '@angular/core';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss']
})
export class TariffComponent implements OnInit {
  btnText: string[] = ["Add", "Confirm", "Cancel"]
  constructor() { }

  ngOnInit(): void {
  }
  data: AOA = [[], []];
  fileName: string = 'SheetJS.csv';
  value: any
  // @Input() sample: any

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(ab);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { blankrows: false, header: 1, range: 1 }));
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

  confirm(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  // Getting Child Data and updating to changed cells to a new value.
  getChildData(event) {
    // console.log(event.event);
    this.data[event.row][event.col] = event.event
  }
}
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { OperatorService } from 'src/app/services/operator.service';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss']
})
export class TariffComponent implements OnInit {
  btnText: string[] = ["Add", "Confirm", "Cancel"]
  sheetHeaders = [
    'zone',
    'country',
    'network_operator',
    'network_code',
    'increment_type',
  ];
  isLoaded: boolean = false;

  constructor(private op: OperatorService, private fb: FormBuilder) { }

  tariff = this.fb.group({
    zone: ["", Validators.required],
    country: ["", Validators.required],
    network_operator: ["", Validators.required],
    network_code: ["", Validators.required],
    increment_type: ["", Validators.required],
  })

  ngOnInit(): void {
    this.op.networkOperator.subscribe(msg => console.log(msg))
  }

  data: AOA = [];
  fileName: string = 'tariff_new.xlsx';
  value: any

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

      this.isLoaded = true
      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { blankrows: false, header: this.sheetHeaders, range: 1 }));
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

  confirm(): void {
    console.log(this.data);

    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    /* save to file */
    // XLSX.writeFile(wb, this.fileName); // Optional (else just console the data)
  }

  // Getting Child Data and updating to changed cells to a new value.
  getChildData(event) {
    this.data[event.row][event.col] = event.value
  }

  // To add an empty row in Tariff form.
  addRow() {
    this.data.push(['', '', '', '', ''])
  }

  // To delete a row in Tariff form.
  deleteRow(row) {
    this.data.splice(row, 1)
  }

  // To discard all edited changes in  Tariff form.
  cancel() {
    this.isLoaded = false
  }
}
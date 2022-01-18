import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { FetchService } from 'src/app/services/fetch.service';
import { OperatorService } from 'src/app/services/operator.service';
import { ValidatorService } from 'src/app/services/validator.service';
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

  // Initializing tariffForm
  tariffForm = this.fb.group(
    {
      tariffItem: this.fb.array([]),
    }
  );
  mnc: any = []

  data: any;
  isLoaded: boolean = false;
  fileName: string = 'tariff_new.xlsx';

  constructor(private op: OperatorService, private fb: FormBuilder, public fetch: FetchService, private validator: ValidatorService) { }

  ngOnInit(): void {
    this.op.networkOperator.subscribe(msg => console.log(msg))
    // this.fetch.getData().subscribe((res) => console.log(res))
  }

  hasError(field: string, error: string): boolean {
    if (error === 'any' || error === '') {
      return (
        this.tariffForm.controls[field].dirty &&
        this.tariffForm.controls[field].invalid
      );
    }

    return (
      this.tariffForm.controls[field].dirty &&
      this.tariffForm.controls[field].hasError(error)
    );
  }

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

      console.log(this.data);

      this.data.forEach((element) => {

        let item = this.fb.group({
          zone: [element['zone']],
          country: [element['country']],
          network_operator: [element['network_operator']],
          network_code: [element['network_code'], [Validators.required], [this.validator.ncValidator()]],
          increment_type: [element['increment_type']]
        })
        this.TariffItem().push(item)
      })
      // this.validator.checkNcExists('a')  
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


  TariffItem(): FormArray {
    return this.tariffForm.get('tariffItem') as FormArray;
  }

  // To add an empty row in Tariff form.
  addRow() {
    let item = this.fb.group({
      zone: [''],
      country: [''],
      network_operator: [''],
      network_code: [''],
      increment_type: ['']
    })

    this.data.push({
      zone: '',
      country: '',
      network_operator: '',
      network_code: '',
      increment_type: ''
    })
    this.TariffItem().push(item)
  }


  // To delete a row in Tariff form.
  deleteRow(row) {
    this.data.splice(row, 1)
    this.TariffItem().removeAt(row)
  }

  // To discard all edited changes in  Tariff form.
  cancel() {
    this.isLoaded = false
  }

  changeEntries(event, rowIndex) {
    this.data[rowIndex][event.target.getAttribute('formControlName')] = event.target.value
    // console.log(this.TariffItem());
    this.TariffItem()
  }

  show() {
    console.log(this.TariffItem().controls);
  }

} 
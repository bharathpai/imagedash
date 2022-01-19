import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { FetchService } from 'src/app/services/fetch.service';
import { OperatorService } from 'src/app/services/operator.service';
import { ToastService } from 'src/app/services/toast.service';
import { ValidatorService } from 'src/app/services/validator.service';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss']
})
export class TariffComponent implements OnInit {
  btnText: string[] = ["Add", "Confirm", "Cancel","Download"]

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
  opArray: any

  constructor(private op: OperatorService, private fb: FormBuilder, public fetch: FetchService, private validator: ValidatorService,
    private toast: ToastService) { }

  ngOnInit(): void {
    // this.op.networkOperator.subscribe(msg => {
    //   // console.log(msg);
    //   // console.log(this.TariffItem());
    //   this.TariffItem().controls.forEach((element) => {
    //     for (let i of msg) {
    //       console.log(element.get('zone')?.value == i.zone_details.zone_name)
    //     }
    //     // console.log(msg.includes(element.get('zone')?.value));
    //   })
    // })
    // this.fetch.getData().subscribe((res) => console.log(res))
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
      if (wb['Strings'].length == 0) {
        let message: string = 'Please Upload a Valid Excel sheet!'
        this.toast.emptyUpload(message)
        throw new Error('Please Upload a Valid Excel sheet!')
      }
      else {
        console.log("File not empty");

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        this.isLoaded = true
        /* save data */
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { blankrows: false, header: this.sheetHeaders, range: 1 }));


        this.TariffItem().clear();

        this.data.forEach((element) => {
          let item = this.fb.group({
            zone: [element['zone']],
            country: [element['country']],
            network_operator: [element['network_operator']],
            network_code: [element['network_code'], [Validators.required], [this.validator.ncValidator()]],
            increment_type: [element['increment_type']]
          },
            { updateOn: 'blur' })
          this.TariffItem().push(item)
        })

        this.op.networkOperator.subscribe(msg => {
          console.log(msg);
          // console.log(this.TariffItem());
          this.TariffItem().controls.forEach((element) => {
            for (let i of msg) {
              // console.log(element.get('zone')?.value == i.zone_details.zone_name)
              console.log(`${element.get('zone')?.value} tarif`);
              console.log(`${i.zone_details.zone_name} zone`);
            }
            // console.log(msg.includes(element.get('zone')?.value));
          })

        })
      }
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

  confirm(): void {

    this.TariffItem().get('network_code')?.setAsyncValidators(this.validator.ncValidator())
    console.log(this.TariffItem().value);


    // console.log(this.data); 
    // console.log(this.TariffItem().value);

    // console.log(el.get('network_code'));

    // el.get('network_code')?.valueChanges.subscribe(
    //   res => console.log(res)
    // )
    // })
    // for (let item of this.TariffItem().controls) {
    //   console.log(item.get('network_code'));

    // }
    // this.TariffItem().clear();

    // this.TariffItem().push(item)
  }

  download(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.TariffItem().value);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
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
      network_code: [0, [Validators.required], [this.validator.ncValidator()]],
      increment_type: ['']
    })
    this.TariffItem().push(item)
  }


  // To delete a row in Tariff form.
  deleteRow(row) {
    this.TariffItem().removeAt(row)
    // this.data.splice(row, 1)
  }

  // To discard all edited changes in  Tariff form.
  cancel() {
    this.isLoaded = false
  }

  changeEntries(event, rowIndex) {

    this.TariffItem().at(rowIndex).patchValue(event.target.value)

    // this.data[rowIndex][event.target.getAttribute('formControlName')] = event.target.value
    // console.log(this.TariffItem());
    // console.log("Simple event" + " " + event);
    // console.log(this.TariffItem());
    // this.TariffItem()

  }

  // update() {
  //   this.TariffItem().clear();

  //   this.data.forEach((element) => {
  //     let item = this.fb.group({
  //       zone: [element['zone']],
  //       country: [element['country']],
  //       network_operator: [element['network_operator']],
  //       network_code: [element['network_code'], [Validators.required], [this.validator.ncValidator()]],
  //       increment_type: [element['increment_type']]
  //     })
  //     this.TariffItem().push(item)
  //   })
  // }

} 
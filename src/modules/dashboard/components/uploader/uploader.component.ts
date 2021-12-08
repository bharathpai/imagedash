import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  imageSrc?: string;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXZsaSIsInN1YiI6IjYxYTYxNmVlNjUxMzNlMDAxOGQzYzUwMyIsImlhdCI6MTYzODM0OTcxMjM2MiwiZXhwIjoxNjM4NDM2MTEyMzYyfQ.BemaM1106lZSNXBy9OqTORm9jW-aIgcipkg5GlUJ4t0',
    })
  };
  ngOnInit(): void {
  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.myForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  submit() {
    console.log(this.myForm.value);
    this.http.post('https://serene-hollows-11661.herokuapp.com/api/v1/upload', this.myForm.value, this.httpOptions)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }
}
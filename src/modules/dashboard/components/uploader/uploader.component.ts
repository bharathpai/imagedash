import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  message = '';
  selectedFile?: File
  fileName: string | undefined
  imgUrl: string | undefined

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0]
  }

  upload(): void {
    if (this.selectedFile) {
      const formData = new FormData()
      formData.append("file", this.selectedFile)
      this.uploadService.onFileSelected(formData).subscribe((res) => {
        this.fileName = this.selectedFile?.name;
        this.imgUrl = res
        if (res) {
          this.message = "Upload Successfull!!"
        }
      })
    }
  }
}

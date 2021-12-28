import { Component, OnInit } from '@angular/core';
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3"

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor() { }
  readonly REGION = 'ap-south-1'
  readonly s3Client = new S3Client({ region: this.REGION })
  bucketParams = { Bucket: 'imagedash' }

  run = async () => {
    try {
      let data = await this.s3Client.send(new ListObjectsCommand(this.bucketParams))
      console.log('Success', data);

    }
    catch (err) {
      console.log('Error', err);

    }
  }

  ngOnInit(): void {
  }

}

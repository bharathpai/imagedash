import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  constructor() { }
  @Input() value?: string;
  @Input() row?: any
  @Input() col?: any

  ngOnInit(): void {
  }

}

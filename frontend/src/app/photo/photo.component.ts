import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor() { }
  url = "http://localhost:4000/uploads/";
  @Input() src: string;
  ngOnInit(): void {
  }

}

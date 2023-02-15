import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { WorkshopsService } from '../services/workshops.service';

@Component({
  selector: 'app-workshop-table',
  templateUrl: './workshop-table.component.html',
  styleUrls: ['./workshop-table.component.css']
})
export class WorkshopTableComponent implements OnInit {
  workshops : Workshop[] = [];
  constructor(private workshopsService : WorkshopsService) { }

  ngOnInit(): void {
    this.workshopsService.getAll().subscribe((workshops:Workshop[]) => {
      this.workshops = workshops;
    });
  }
  sortOrder = 'asc';
  sortColumn = '';

  sort(column: string) {
    if (column === this.sortColumn) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
    this.workshops.sort((a, b) => {
      if (a[column] < b[column]) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (a[column] > b[column]) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
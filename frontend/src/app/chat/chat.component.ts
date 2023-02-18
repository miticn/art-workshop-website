import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkshopsService } from '../services/workshops.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private workshopService: WorkshopsService, private activatedRoute : ActivatedRoute) { }
  workshopId: string;
  ngOnInit(): void {
    this.workshopId = this.activatedRoute.snapshot.paramMap.get('workshopId');
    this.workshopService.getMessages(this.workshopId).subscribe((res) => {
      
      console.log(res);
    });
  }

}

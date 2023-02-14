import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Helper } from '../helper';
import { Workshop } from '../models/workshop';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { WorkshopsService } from '../services/workshops.service';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.css']
})
export class Top5Component implements OnInit {
  faHeart = faHeart;

  constructor(private workshopService : WorkshopsService, public photoHepler: Helper, private modalService: ModalService, private auth: AuthService,
    private router: Router) { }
  workshops : Workshop[] = [];
  ngOnInit(): void {
    this.workshopService.getAll().subscribe((data:Workshop[]) => {
      this.workshops = data;
      this.workshops.sort((a,b) => {
        return b.likes - a.likes;
      });
      this.workshops = this.workshops.slice(0,5);
      console.log(this.workshops);
    });
  }

  sortWorkshopsByDate(){
    this.workshops.sort((a,b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
  sortWorkshopsByName(){
    this.workshops.sort((a,b) => {
      return a.name.localeCompare(b.name);
    });
  }

  details(workshop : Workshop){
    if (this.auth.isLoggedIn()){
      this.router.navigate(['/workshop', workshop._id]);
    }
    else{
      this.modalService.set('Niste prijavljeni', 'Morate biti prijavljeni da bi ste videli detalje o radionici');
      this.modalService.openModal();
    }
  }
}

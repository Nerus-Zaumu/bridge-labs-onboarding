import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  view(cardID: string){
    this.dataService.openDialog(cardID)
  }

}

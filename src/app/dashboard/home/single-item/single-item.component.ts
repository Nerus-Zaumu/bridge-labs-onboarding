import { Router } from '@angular/router';
import { DataService } from './../../data.service';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {

  constructor(public dataService: DataService, @Optional() public dialogRef: MatDialogRef<SingleItemComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {route: ActivatedRoute}, private router: Router) { }

  ngOnInit(): void {
    const urlSections = this.router.url.split('/')
     const cardID = urlSections[urlSections.length - 1]
     this.dataService.loadedCard = this.dataService.getCurrentCard(cardID)

  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}

import { UserService } from './../../user/user.service';
import { DataService } from './../../dashboard/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataService, public userService: UserService) { }
  email!: string;

  ngOnInit(): void {
    this.userService.bridgeUser.subscribe(
      user => {
        this.email = user!.email
      }
    )
  }

  logout(){
    this.userService.logout()
  }

}

import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../signup/signup.component.css']
})
export class LoginComponent implements OnInit {

  viewState = false;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  passwordToggle(){
    this.viewState = !this.viewState
  }

}

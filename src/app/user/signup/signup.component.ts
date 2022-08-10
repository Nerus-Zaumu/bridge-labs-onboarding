import { UserService } from './../user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('file') file!: ElementRef
  viewState = false
  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  passwordToggle(){
    this.viewState = !this.viewState
  }

}

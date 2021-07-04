import {Component, OnInit} from '@angular/core';
import {IContent} from "../../../common/Interfaces";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SignInComponent} from "../../auth/sign-in/sign-in.component";

@Component({
  selector: 'sts-nav',
  templateUrl: './sts-nav.component.html',
  styleUrls: ['./sts-nav.component.scss']
})
export class StsNavComponent implements OnInit {
  loggedIn: boolean;
  action: string;
  constructor(public dialog: MatDialog) {
    this.loggedIn = false;
    this.action = "login"
  }

  ngOnInit(): void {
  }

  toggleLogin(): void {
    if(!this.loggedIn){
      this.login()
    }else{
      this.logout()
    }
    this.loggedIn = !this.loggedIn;
    this.action = !this.loggedIn? "login" : "logout";
  }

  login() :void {
    const loginDialogConfig = new MatDialogConfig();

    loginDialogConfig.width = '600px';

    this.dialog.open(SignInComponent, loginDialogConfig);
  }

  logout():void{

  }
}

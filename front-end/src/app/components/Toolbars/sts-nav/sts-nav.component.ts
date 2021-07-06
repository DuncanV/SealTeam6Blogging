import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from "../../../common/Interfaces";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProfileComponent} from "../../profile/profile.component";
import {Subscription} from "rxjs";
import {UsersService} from "../../../services/users.service";
import {SignInComponent} from "../../auth/sign-in/sign-in.component";

@Component({
  selector: 'sts-nav',
  templateUrl: './sts-nav.component.html',
  styleUrls: ['./sts-nav.component.scss']
})
export class StsNavComponent implements OnInit, OnDestroy {
  loggedIn: boolean;
  userData: IUser | undefined;
  action: string;

  private subscriptions = new Subscription();

  constructor(private service: UsersService, public dialog: MatDialog) {
    this.loggedIn = false;
    this.action = "login"
  }

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    this.subscriptions.add(
      this.service.signedIn$.subscribe((value) => {
        this.loggedIn = value;
      })
    );

    this.subscriptions.add(
      this.service.user$.subscribe((data) => {
        this.userData = data;
      })
    );
  }

  openProfileDialog() {
    const profileDialogConfig = new MatDialogConfig();

    profileDialogConfig.width = '500px';

    profileDialogConfig.data = {
      userData: this.userData
    }

    this.dialog.open(ProfileComponent, profileDialogConfig);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleLogin(): void {
    if (!this.loggedIn) {
      this.login()
    } else {
      this.logout()
    }

    this.loggedIn = !this.loggedIn;
    this.action = !this.loggedIn ? "login" : "logout";
  }

  login(): void {
    const loginDialogConfig = new MatDialogConfig();

    loginDialogConfig.width = '600px';

    this.dialog.open(SignInComponent, loginDialogConfig);
  }

  logout(): void {}
}

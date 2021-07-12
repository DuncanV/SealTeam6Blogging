import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IUser} from "../../../common/Models/Interfaces";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProfileComponent} from "../../profile/profile.component";
import {Subscription} from "rxjs";
import {UsersService} from "../../../services/users.service";
import {SignInComponent} from "../../auth/sign-in/sign-in.component";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'sts-nav',
  templateUrl: './sts-nav.component.html',
  styleUrls: ['./sts-nav.component.scss']
})
export class StsNavComponent implements OnInit, OnDestroy {
  @Input() isDarkTheme = false;

  loggedIn: boolean | undefined;
  userData: IUser | undefined;
  action: string | undefined;

  private subscriptions = new Subscription();

  constructor(private service: UsersService, private themeService: ThemeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    this.subscriptions.add(
      this.service.signedIn$.subscribe((value) => {
        this.loggedIn = value;
        this.action = !value ? "login" : "logout";
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

    profileDialogConfig.width = '535px';

    if (this.isDarkTheme) {
      profileDialogConfig.panelClass = 'dark';
    }

    profileDialogConfig.data = {
      userData: this.userData,
      isDarkTheme: this.isDarkTheme
    }

    this.dialog.open(ProfileComponent, profileDialogConfig);
  }

  toggleTheme() {
    this.themeService.activateDarkTheme.next(!this.isDarkTheme);
  }

  toggleLogin(): void {
    if (!this.loggedIn) {
      this.login()
    } else {
      this.logout()
    }
  }

  login(): void {
    const loginDialogConfig = new MatDialogConfig();

    loginDialogConfig.width = '600px';
    loginDialogConfig.data = {
      isDarkTheme: this.isDarkTheme
    }

    if (this.isDarkTheme) {
      loginDialogConfig.panelClass = 'dark';
    }

    this.dialog.open(SignInComponent, loginDialogConfig);
  }

  logout(): void {
    this.service.logout();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

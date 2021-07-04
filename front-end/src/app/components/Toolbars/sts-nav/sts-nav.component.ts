import {Component, OnDestroy, OnInit} from '@angular/core';
import {IContent, IUser} from "../../../common/Interfaces";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BlogModalComponent} from "../../blogs/blog-modal/blog-modal.component";
import {ProfileComponent} from "../../profile/profile.component";
import {Observable, Subscription} from "rxjs";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'sts-nav',
  templateUrl: './sts-nav.component.html',
  styleUrls: ['./sts-nav.component.scss']
})
export class StsNavComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  userData: IUser | undefined;

  private subscriptions = new Subscription();

  constructor(private service: UsersService, public dialog: MatDialog) { }

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
}

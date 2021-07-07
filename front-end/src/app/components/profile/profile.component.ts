import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Subscription} from "rxjs";
import {IUser} from "../../common/Interfaces";
import {ERole} from "../../common/Enums";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: IUser | undefined;
  private subscriptions = new Subscription();
  firstname: string | undefined;
  lastname: string | undefined;
  password: string | undefined;
  username: string | undefined;

  constructor(private service: UsersService, @Inject(MAT_DIALOG_DATA) data: any) {
    this.userData = data.userData;
  }

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  setupSubscriptions() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

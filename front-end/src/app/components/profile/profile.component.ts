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
export class ProfileComponent implements OnInit {
  userData: IUser | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
  username: string | undefined;

  constructor(private service: UsersService, @Inject(MAT_DIALOG_DATA) data: any) {
    this.userData = data.userData;
  }

  ngOnInit(): void {
  }

  updateProfile(): void {
    if (this.userData) {
      if (this.password === this.passwordConfirm) {
        this.service.updateProfile(this.userData);
      } else {
        // ERROR HERE
      }
    }
  }
}

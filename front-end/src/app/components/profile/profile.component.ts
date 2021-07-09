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
  passwordConfirmed: string | undefined;
  username: string | undefined;

  constructor(private service: UsersService, @Inject(MAT_DIALOG_DATA) data: any) {
    this.userData = data.userData;
  }

  ngOnInit(): void {
  }

  updateProfile(): void {
    if (this.password === this.passwordConfirmed || !this.password) {
      let data = {};

      if (this.username) Object.assign(data, {username: this.username});
      if (this.firstname) Object.assign(data, {firstname: this.firstname});
      if (this.lastname) Object.assign(data, {lastname: this.lastname});
      if (this.password) Object.assign(data, {password: this.password});
      if (this.passwordConfirmed) Object.assign(data, {passwordConfirmed: this.passwordConfirmed});

      this.service.updateProfile(data, this.userData ? this.userData : {} as IUser);
    } else {
      // ERROR HERE
    }
  }
}

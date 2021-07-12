import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Subscription} from "rxjs";
import {IUser} from "../../common/Models/Interfaces";
import {EPasswordsMessages, ERole, ESnackBarType} from "../../common/Models/Enums";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SnackbarComponent} from "../snackbar/snackbar.component";
import {SNACKBAR_DURATION} from "../../common/Constants/Constants";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private service: UsersService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) data: any) {
    this.userData = data.userData;
  }

  ngOnInit(): void {
  }

  updateProfile(): void {
    if (this.password === this.passwordConfirmed) {
      if (!!this.password && !this.CheckRegex(this.password)) {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.error],
          data: {
            message: EPasswordsMessages.invalidPassword,
          }
        });

        return;
      }

      let data = {};

      if (this.username) Object.assign(data, {username: this.username});
      if (this.firstname) Object.assign(data, {firstname: this.firstname});
      if (this.lastname) Object.assign(data, {lastname: this.lastname});
      if (this.password) Object.assign(data, {password: this.password});
      if (this.passwordConfirmed) Object.assign(data, {passwordConfirmed: this.passwordConfirmed});

      this.service.updateProfile(data, this.userData ? this.userData : {} as IUser);
    } else {
      this.snackbar.openFromComponent(SnackbarComponent, {
        duration: SNACKBAR_DURATION,
        panelClass: [ESnackBarType.error],
        data: {
          message: EPasswordsMessages.passwordDoNotMatch,
        }
      });
    }
  }

  CheckRegex(password: string): RegExpMatchArray | null{
    return password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{10,})');
  }
}

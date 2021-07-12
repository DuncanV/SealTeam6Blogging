import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  activateDarkTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    let tempTheme = false;
    let sessionTheme = JSON.parse(<string>sessionStorage.getItem('isDarkTheme'));
    let localTheme = JSON.parse(<string>localStorage.getItem('isDarkTheme'));

    if (sessionTheme) {
      tempTheme = sessionTheme;
    } else if (localTheme) {
      tempTheme = localTheme;
    }

    this.activateDarkTheme.next(tempTheme);
  }

  changeTheme() {
    let isDarkTheme = false;
    this.activateDarkTheme.subscribe(value => {
      isDarkTheme = value;
      sessionStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
      localStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
    });

    this.activateDarkTheme.next(!isDarkTheme);
  }
}

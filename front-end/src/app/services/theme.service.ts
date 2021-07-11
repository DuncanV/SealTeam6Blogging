import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  activateDarkTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  changeTheme() {
    let isDarkTheme = false;
    this.activateDarkTheme.subscribe(value => {
      isDarkTheme = value;
    });

    this.activateDarkTheme.next(!isDarkTheme);
  }
}

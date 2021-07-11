import {Component, HostListener, OnInit} from '@angular/core';
import {IUser} from "./common/Interfaces";
import {ThemeService} from "./services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  isDarkTheme: boolean = false;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    const userData: IUser = JSON.parse(<string>sessionStorage.getItem('userData'));

    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }

    this.themeService.activateDarkTheme.subscribe(value => {
      this.isDarkTheme = value;
    });
  }

  @HostListener("window:beforeunload",["$event"])
  clearLocalStorage(event: any){
    localStorage.clear();
  }
}

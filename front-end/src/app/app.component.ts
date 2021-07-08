import {Component, HostListener, OnInit} from '@angular/core';
import {IUser} from "./common/Interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end';

  ngOnInit() {
    const userData: IUser = JSON.parse(<string>sessionStorage.getItem('userData'));

    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }

  @HostListener("window:beforeunload",["$event"])
  clearLocalStorage(event: any){
    localStorage.clear();
  }
}

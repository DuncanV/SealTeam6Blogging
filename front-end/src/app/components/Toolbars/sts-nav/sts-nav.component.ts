import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sts-nav',
  templateUrl: './sts-nav.component.html',
  styleUrls: ['./sts-nav.component.scss']
})
export class StsNavComponent implements OnInit {
  loggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

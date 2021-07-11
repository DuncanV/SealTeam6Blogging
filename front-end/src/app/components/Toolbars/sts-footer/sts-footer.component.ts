import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sts-footer',
  templateUrl: './sts-footer.component.html',
  styleUrls: ['./sts-footer.component.scss']
})
export class StsFooterComponent implements OnInit {
  @Input() isDarkTheme: boolean = false;

  year: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.year = (new Date()).getFullYear();
  }

  showMessage() {
    alert("We weren't allowed to host this one.");
  }
}

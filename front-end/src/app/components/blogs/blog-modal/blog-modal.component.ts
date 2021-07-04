import {Component, Inject, OnInit} from '@angular/core';
import {IContent} from "../../../common/Interfaces";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-blog-modal',
  templateUrl: './blog-modal.component.html',
  styleUrls: ['./blog-modal.component.scss']
})
export class BlogModalComponent implements OnInit {
  blog: IContent;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.blog = data.blog;
  }

  ngOnInit(): void {
  }

}

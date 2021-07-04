import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IContent} from "../../../common/Interfaces";
import {BlogsService} from "../../../services/blogs.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BlogModalComponent} from "../blog-modal/blog-modal.component";

@Component({
  selector: 'app-blog-component',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs$: Observable<IContent[]> | undefined;
  // private subscriptions = new Subscription();

  constructor(private service: BlogsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.blogs$ = this.service.getBlogs();
  }

  setupSubscriptions() {
    // TODO: Setup all needed subscriptions
  }

  openBlogDialog(blog: IContent) {
    const blogDialogConfig = new MatDialogConfig();

    blogDialogConfig.width = '600px';

    blogDialogConfig.data = {
      blog: blog
    }

    this.dialog.open(BlogModalComponent, blogDialogConfig);
  }
}

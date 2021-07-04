import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IContent, IUser} from "../../../common/Interfaces";
import {BlogsService} from "../../../services/blogs.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BlogModalComponent} from "../blog-modal/blog-modal.component";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-blog-component',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() blog: IContent = {} as IContent;
  @Input() loggedIn: boolean = false;
  @Input() username: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  displayVisibilityIcon(blog: IContent): boolean {
    return this.loggedIn ? this.loggedIn && (blog.username === this.username) : false;
  }

  openBlogDialog(blog: IContent): void {
    const blogDialogConfig = new MatDialogConfig();

    blogDialogConfig.width = '600px';

    blogDialogConfig.data = {
      blog: blog
    }

    this.dialog.open(BlogModalComponent, blogDialogConfig);
  }
}

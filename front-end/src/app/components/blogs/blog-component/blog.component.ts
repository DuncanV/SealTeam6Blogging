import {Component, Input, OnInit} from '@angular/core';
import {IContent} from "../../../common/Interfaces";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BlogModalComponent} from "../blog-modal/blog-modal.component";

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

  displayBlog(blog:IContent):boolean{
    return blog.visible || blog.username === this.username;
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

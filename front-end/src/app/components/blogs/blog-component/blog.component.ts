import {Component, Input, OnInit} from '@angular/core';
import {IContent} from "../../../common/Interfaces";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BlogModalComponent} from "../blog-modal/blog-modal.component";
import {BlogsService} from "../../../services/blogs.service";
import {likeAnimation} from "./blog.animations";
import {SignInComponent} from "../../auth/sign-in/sign-in.component";

@Component({
  selector: 'app-blog-component',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [likeAnimation]
})
export class BlogComponent implements OnInit {
  @Input() blog: IContent = {} as IContent;
  @Input() loggedIn: boolean = false;
  @Input() username: string = '';
  @Input() isDarkTheme: boolean = false;
  blogIsLiked: boolean = false;

  constructor(private blogService: BlogsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.blogIsLiked = this.isLiked;
  }

  get isLiked(): boolean {
    return this.blog.likes.includes(this.username);
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

    if (this.isDarkTheme) {
      blogDialogConfig.panelClass = 'dark';
    }

    blogDialogConfig.data = {
      blog: blog,
      isDarkTheme: this.isDarkTheme
    }

    this.dialog.open(BlogModalComponent, blogDialogConfig);
  }

  likeBlog() {
    if (this.loggedIn) {
      if (this.blogIsLiked) {
        this.blog.likes = this.blog.likes.filter(username => username !== this.username);
      } else {
        this.blog.likes.push(this.username);
      }
      this.blogIsLiked = !this.blogIsLiked;
      this.blogService.likeBlog(this.blog.id, this.username);
    } else {
      const loginDialogConfig = new MatDialogConfig();

      loginDialogConfig.width = '600px';
      loginDialogConfig.data = {
        isDarkTheme: this.isDarkTheme
      }

      if (this.isDarkTheme) {
        loginDialogConfig.panelClass = 'dark';
      }

      this.dialog.open(SignInComponent, loginDialogConfig);
    }
  }
}

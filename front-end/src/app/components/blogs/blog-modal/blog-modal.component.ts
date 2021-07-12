import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {IContent} from "../../../common/Models/Interfaces";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {BlogsService} from "../../../services/blogs.service";
import {UsersService} from "../../../services/users.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-blog-modal',
  templateUrl: './blog-modal.component.html',
  styleUrls: ['./blog-modal.component.scss']
})
export class BlogModalComponent implements OnInit, OnDestroy {
  blog: IContent;
  editing: boolean = false;
  loggedIn: boolean = false;
  originalVisibility: boolean | undefined;
  isMyBlog: boolean = false;


  private subscription = new Subscription();

  constructor(
    private userService: UsersService,
    private blogService: BlogsService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.blog = data.blog;
  }

  ngOnInit(): void {
    this.setupSubscriptions();

    this.originalVisibility = this.blog.visible;

    this.getIsMyBlog();
  }

  setupSubscriptions() {
    this.subscription.add(
      this.userService.signedIn$.subscribe((value) => {
        this.loggedIn = value;
      })
    );
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  toggleVisibility(): void {
    this.blog.visible = !this.blog.visible;
  }

  getIsMyBlog(): void {
    this.isMyBlog = this.blog.username === this.userService.getUserName()
  }

  get showUpdateButtons(): boolean {
    const isNotOriginalVisibility = this.blog.visible !== this.originalVisibility;
    return this.editing || isNotOriginalVisibility;
  }

  updateBlog(): void {
    this.blogService.updateBlog(this.blog);
  }

  deleteBlog(): void {
    this.blogService.deleteBlog(this.blog);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

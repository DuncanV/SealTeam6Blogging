import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IContent, IUser} from "../../../common/Interfaces";
import {BlogsService} from "../../../services/blogs.service";
import {UsersService} from "../../../services/users.service";
import {showDividerAnimation, showMyBlogsAnimation} from "./blog-container.animations";

@Component({
  selector: 'app-blog-container',
  templateUrl: './blog-container.component.html',
  styleUrls: ['./blog-container.component.scss'],
  animations: [showMyBlogsAnimation, showDividerAnimation]
})
export class BlogContainerComponent implements OnInit, OnDestroy {
  blogs$: Observable<IContent[]> | undefined;
  myBlogs$: Observable<IContent[]> | undefined;
  loggedIn: boolean | undefined;
  userData: IUser | undefined;
  showMyBlogs: boolean = true;
  myBlogsIsEmpty: boolean = true;
  private subscriptions = new Subscription();

  constructor(private blogsService: BlogsService, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getBlogs();
    this.setupSubscriptions();
  }

  getBlogs(): void {
    this.blogsService.getBlogs();
    this.blogs$ = this.blogsService.blogs$;
    this.myBlogs$ = this.blogsService.myBlogs$;
  }

  setupSubscriptions(): void {
    this.subscriptions.add(
      this.usersService.signedIn$.subscribe(value => {
        this.loggedIn = value;
      })
    );

    this.subscriptions.add(
      this.usersService.user$.subscribe(value => {
        this.userData = value;
      })
    );

    this.subscriptions.add(
      this.myBlogs$?.subscribe((blogs: IContent[]) => {
        this.myBlogsIsEmpty = blogs.length === 0;
      })
    );

    this.subscriptions.add(
      this.blogsService.getBlogs$.subscribe(value => {
        if (value) {
          this.getBlogs();
        }
      })
    );
  }

  toggleMyBlogs() {
    this.showMyBlogs = !this.showMyBlogs;
  }

  postBlog() {
    const blog: IContent = {
      title: 'Test Title',
      content: 'Test Content'
    } as IContent;

    if (this.blogsService.createBlog(blog)) {
      this.getBlogs();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

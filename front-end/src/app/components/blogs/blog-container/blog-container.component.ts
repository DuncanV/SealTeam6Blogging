import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IContent, IUser} from "../../../common/Interfaces";
import {BlogsService} from "../../../services/blogs.service";
import {UsersService} from "../../../services/users.service";
import {showDividerAnimation, showMyBlogsAnimation} from "./blog-container.animations";
import {MatDialog} from "@angular/material/dialog";
import {CreateBlogComponent} from "../create-blog/create-blog.component";
import {LoaderService} from "../../../services/loader.service";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-blog-container',
  templateUrl: './blog-container.component.html',
  styleUrls: ['./blog-container.component.scss'],
  animations: [showMyBlogsAnimation, showDividerAnimation]
})
export class BlogContainerComponent implements OnInit, OnDestroy {
  @Input() isDarkTheme: boolean = false;

  showLoader: boolean = true;
  blogs$: Observable<IContent[]> | undefined;
  myBlogs$: Observable<IContent[]> | undefined;
  loggedIn: boolean | undefined;
  userData: IUser | undefined;
  showMyBlogs: boolean = true;
  myBlogsIsEmpty: boolean = true;
  private subscriptions = new Subscription();

  constructor(private blogsService: BlogsService,
              private usersService: UsersService,
              private loaderService: LoaderService,
              private themeService: ThemeService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getBlogs();
    this.setupSubscriptions();
  }

  getBlogs(): void {
    this.blogsService.getBlogs();
    this.blogs$ = this.blogsService.blogs$;
    this.myBlogs$ = this.blogsService.myBlogs$;

    this.myBlogs$?.subscribe((blogs: IContent[]) => {
      this.myBlogsIsEmpty = blogs.length === 0;
    })
  }

  setupSubscriptions(): void {
    this.subscriptions.add(
      this.themeService.activateDarkTheme.subscribe(value => {
        this.isDarkTheme = value;
      })
    );

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
      this.loaderService.showBlogsLoader$.subscribe(value => {
        this.showLoader = value;
        console.log(this.showLoader)
      })
    );

    this.subscriptions.add(
      this.blogsService.getBlogs$.subscribe(value => {
        if (value) {
          this.getBlogs();
        }
      })
    );

    this.subscriptions.add(
      this.usersService.getBlogs$.subscribe(value => {
        if (value) {
          this.getBlogs();
          this.usersService.getBlogs$.next(false);
        }
      })
    );
  }

  toggleMyBlogs() {
    this.showMyBlogs = !this.showMyBlogs;
  }

  openCreateBlogDialog() {
    this.dialog.open(CreateBlogComponent);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

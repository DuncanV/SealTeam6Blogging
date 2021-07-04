import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IContent, IUser} from "../../../common/Interfaces";
import {BlogsService} from "../../../services/blogs.service";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-blog-container',
  templateUrl: './blog-container.component.html',
  styleUrls: ['./blog-container.component.scss']
})
export class BlogContainerComponent implements OnInit {
  blogs$: Observable<IContent[]> | undefined;
  myBlogs$: Observable<IContent[]> | undefined;
  loggedIn: boolean | undefined;
  userData: IUser | undefined;
  showMyBlogs: boolean = true;
  private subscriptions = new Subscription();

  constructor(private blogsService: BlogsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.blogs$ = this.blogsService.getBlogs();
    this.myBlogs$ = this.blogsService.getMyBlogs();
    this.setupSubscriptions();
  }

  setupSubscriptions() {
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
  }

  toggleMyBlogs() {
    this.showMyBlogs = !this.showMyBlogs;
  }
}

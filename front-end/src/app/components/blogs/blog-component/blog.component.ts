import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IContent} from "../../../common/Interfaces";
import {BlogsService} from "../../../services/blogs.service";

@Component({
  selector: 'app-blog-component',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs$: Observable<IContent[]> | undefined;
  // subscriptions: Subscription;

  constructor(private service: BlogsService) { }

  ngOnInit(): void {
    this.blogs$ = this.service.getBlogs();
  }

  setupSubscriptions() {
    // TODO: Setup all needed subscriptions
  }
}

import { Component, OnInit } from '@angular/core';
import {IContent} from "../../../common/Models/Interfaces";
import {BlogsService} from "../../../services/blogs.service";

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent {
  title: string | undefined;
  blogContent: string | undefined;

  constructor(private service: BlogsService) { }

  postBlog() {
    if (!this.title) {

    } else if (!this.blogContent) {

    } else {
      const blog: IContent = {
        title: this.title,
        content: this.blogContent
      } as IContent;

      this.service.createBlog(blog);
    }
  }
}

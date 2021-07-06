import { Injectable } from '@angular/core';
import { IContent } from '../common/Interfaces';
import { Observable, of } from 'rxjs';
import { UsersService } from './users.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

const baseURL = 'http://localhost:3000';

const apiEndpoints = {
  blogs: '/blogs',
  updateBlogs: '/blogs/{id}',
};

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private usersService: UsersService, private http: HttpClient) {}

  getAllBlogs() {
    return this.http.get<IContent[]>(baseURL + apiEndpoints.blogs, {
      observe: 'response',
    });
  }

  getBlogs() {
    const username: string = this.usersService.geUserName();

    return this.getAllBlogs().pipe(
      map((response: HttpResponse<any>) => {
        return response.body.data.filter((blog: IContent) => blog.username !== username);
      })
    );
  }

  getMyBlogs(): Observable<IContent[]> {
    const username: string = this.usersService.geUserName();

    return this.getAllBlogs().pipe(
      map((response: HttpResponse<any>) => {
        return response.body.data.filter((blog: IContent) => blog.username === username);
      })
    );
  }

  updateBlog(blog: IContent): Observable<HttpResponse<Object>> {
    const payload = {
      visible: blog.visible,
      content: blog.content,
      title: blog.title
    };
    const url =
      baseURL + apiEndpoints.updateBlogs.replace('{id}', String(blog.id));

    return this.http.put(url, payload, {
      observe: 'response',
    });
  }

  deleteBlog(blog: IContent): Observable<HttpResponse<Object>> {
    const url =
      baseURL + apiEndpoints.updateBlogs.replace('{id}', String(blog.id));

    return this.http.delete(url, {
      observe: 'response',
    });
  }

  createBlog(blog: IContent): Observable<HttpResponse<Object>> {
    const payload = {
      title: blog.title,
      content: blog.content
    };

    return this.http.post(baseURL + apiEndpoints.blogs, payload, {
      observe: 'response',
    });
  }
}

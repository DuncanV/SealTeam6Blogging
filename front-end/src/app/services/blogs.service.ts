import {Injectable} from '@angular/core';
import {IContent} from '../common/Interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {UsersService} from './users.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";

const baseURL = 'http://localhost:3000';

const apiEndpoints = {
  blogs: '/blogs',
  updateBlogs: '/blogs/{id}',
};

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  blogs$: Observable<IContent[]> | undefined;
  myBlogs$: Observable<IContent[]> | undefined;
  getBlogs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private usersService: UsersService, private http: HttpClient, public dialog: MatDialog) {}

  getAllBlogs() {
    return this.http.get(baseURL + apiEndpoints.blogs, {
      observe: 'response',
    });
  }

  getBlogs() {
    const username: string = this.usersService.getUserName();

    const allBlogs = this.getAllBlogs();

    if (username) {
      this.blogs$ = allBlogs.pipe(
        map((response: HttpResponse<any>) => {
          const allBlogs: IContent[] = response.body.data;
          return allBlogs.filter((blog: IContent) => blog.username !== username && !blog.deleted);
        })
      );

      if (username) {
        this.myBlogs$ = allBlogs.pipe(
          map((response: HttpResponse<any>) => {
            const allBlogs: IContent[] = response.body.data;

            return allBlogs.filter((blog: IContent) => blog.username === username && !blog.deleted);
          })
        );
      }
    } else {
      this.blogs$ = allBlogs.pipe(
        map((response: HttpResponse<any>) => {
          const allBlogs: IContent[] = response.body.data;
          return allBlogs.filter((blog: IContent) => !blog.deleted);
        })
      );

      this.myBlogs$ = allBlogs.pipe(
        map((response: HttpResponse<any>) => {
          return [] as IContent[];
        })
      );
    }

    this.getBlogs$.next(false);
  }

  updateBlog(blog: IContent) {
    const payload = {
      visible: blog.visible,
      content: blog.content,
      title: blog.title
    };
    const url =
      baseURL + apiEndpoints.updateBlogs.replace('{id}', String(blog.id));

    this.http.put(url, payload, {
      observe: 'response',
    }).subscribe((response: HttpResponse<any>) => {


      if (response.status === 200) {
        this.getBlogs$.next(true);

        this.dialog.closeAll();
      }
    });
  }

  deleteBlog(blog: IContent) {
    const url =
      baseURL + apiEndpoints.updateBlogs.replace('{id}', String(blog.id));

    this.http.delete(url, {
      observe: 'response',
    }).subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.getBlogs$.next(true);

        this.dialog.closeAll();
      }
    });
  }

  createBlog(blog: IContent) {
    const payload = {
      title: blog.title,
      content: blog.content
    };

    this.http.post(baseURL + apiEndpoints.blogs, payload, {
      observe: 'response',
    }).subscribe((response: HttpResponse<any>) => {
      if (response.status === 201) {
        this.getBlogs$.next(true);

        this.dialog.closeAll();
        this.getBlogs$.next(true);
      }
    });
  }
}

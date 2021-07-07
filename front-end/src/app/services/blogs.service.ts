import {Injectable} from '@angular/core';
import {IContent} from '../common/Interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {UsersService} from './users.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

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

  constructor(private usersService: UsersService, private http: HttpClient) {}

  getAllBlogs() {
    return this.http.get(baseURL + apiEndpoints.blogs, {
      observe: 'response',
    });
  }

  getBlogs() {
    const username: string = this.usersService.geUserName();

    const allBlogs = this.getAllBlogs();

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

    this.getBlogs$.next(false);
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

  deleteBlog(blog: IContent) {
    const url =
      baseURL + apiEndpoints.updateBlogs.replace('{id}', String(blog.id));

    this.http.delete(url, {
      observe: 'response',
    }).subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.getBlogs$.next(true);
      }
    });
  }

  createBlog(blog: IContent): boolean {
    const payload = {
      title: blog.title,
      content: blog.content
    };

    let isSuccessful = false;

    this.http.post(baseURL + apiEndpoints.blogs, payload, {
      observe: 'response',
    }).subscribe((response: HttpResponse<any>) => {
      if (response.status === 201) {
        this.getBlogs$.next(true);

        isSuccessful = true;
      }
    });

    return isSuccessful;
  }
}

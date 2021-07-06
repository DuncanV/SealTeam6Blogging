import { Injectable } from '@angular/core';
import { IContent } from '../common/Interfaces';
import { Observable, of } from 'rxjs';
import { UsersService } from './users.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

const baseURL = 'http://localhost:3000';

const apiEndpoints = {
  blogs: '/blogs',
  updateBlogs: '/blogs/{id}',
};

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  // blogs$: Observable<IContent[]>;
  blogs$: IContent[] = [
    {
      id: 1,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content:
        'This is static content for testing purposes only, dsaf sdf asdf asuidfgui asdkgfui ewquiebqwf uiebwfuil asbjifbsl fbasjklfbeuiw asdfvbashdfk jasdv fkjasvdf kasdvas dkfjavsdf jdf askdjlf kasjdhf klasjhd fkjbwe dlfkqjwe b asdfb asjkldfb jkasdfbl askjfbadsfjkl ',
      created: new Date(),
      deleted: false,
      visible: true,
    },
    {
      id: 2,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: true,
    },
    {
      id: 3,
      username: 'DunkinDonuts',
      title: 'A post by Duncan',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: false,
    },
    {
      id: 4,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: false,
    },
    {
      id: 5,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: true,
    },
    {
      id: 7,
      username: 'DunkinDonuts',
      title: 'A post by Duncan',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: false,
    },
    {
      id: 8,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: true,
    },
    {
      id: 9,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: false,
    },
  ];

  constructor(private usersService: UsersService, private http: HttpClient) {}

  getAllBlogs(): Observable<IContent[]> {
    // return this.http.get(baseURL + apiEndpoints.blogs, {
    //   observe: 'response',
    // });
    const test = this.http.get(baseURL + apiEndpoints.blogs, {
        observe: 'response',
      });

    test.subscribe(value => {
      console.log(value);
    })

    return of(this.blogs$);
  }

  getBlogs(): Observable<IContent[]> {
    let blogs: IContent[] = [];
    const username: string = this.usersService.geUserName();

    // return this.getAllBlogs().pipe(
    //   map((response: HttpResponse<any>) => {
    //     const result: IContent[] = response.body.blogs.filter(
    //       (blog: IContent) => blog.username !== username
    //     );
    //
    //     return result;
    //   })
    // );

    blogs = this.blogs$.filter((blog) => blog.username !== username);

    return of(blogs);
  }

  getMyBlogs(): Observable<IContent[]> {
    let myBlogs: IContent[] = [];
    const username: string = this.usersService.geUserName();

    // return this.getAllBlogs().pipe(
    //   map((response: HttpResponse<any>) => {
    //     const result: IContent[] = response.body.blogs.filter(
    //       (blog: IContent) => blog.username === username
    //     );
    //
    //     return result;
    //   })
    // );

    this.getAllBlogs().subscribe((blogs) => {
      myBlogs = blogs.filter((blog) => blog.username === username);
    });

    return of(myBlogs);
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
      blog,
    };

    return this.http.post(baseURL + apiEndpoints.blogs, payload, {
      observe: 'response',
    });
  }
}

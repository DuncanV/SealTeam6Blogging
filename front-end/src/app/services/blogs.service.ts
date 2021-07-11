import {Injectable} from '@angular/core';
import {IContent} from '../common/Interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {UsersService} from './users.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../components/snackbar/snackbar.component";
import {ECreateBlogMessages, EDeleteBlogMessages, ESnackBarType, EUpdateBlogMessages} from "../common/Enums";
import {SNACKBAR_DURATION} from "../common/Constants";
import {LoaderService} from "./loader.service";

const baseURL = 'http://localhost:3000';

const apiEndpoints = {
  blogs: '/blogs',
  updateBlogs: '/blogs/{id}',
  likeBlog: '/blogs/like/{id}'
};

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  blogs$: Observable<IContent[]> | undefined;
  myBlogs$: Observable<IContent[]> | undefined;
  getBlogs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private usersService: UsersService, private loaderService: LoaderService, private http: HttpClient, private snackbar: MatSnackBar, public dialog: MatDialog) {
  }

  getAllBlogs() {
    this.loaderService.showBlogsLoader$.next(true);

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

      new Promise(resolve => setTimeout(resolve, 2500)).then(r => {
        this.loaderService.showBlogsLoader$.next(false);
      });
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
    new Promise(resolve => setTimeout(resolve, 2500)).then(r => {
      this.loaderService.showBlogsLoader$.next(false);
    });
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

          this.snackbar.openFromComponent(SnackbarComponent, {
            duration: SNACKBAR_DURATION,
            panelClass: [ESnackBarType.success],
            data: {
              message: EUpdateBlogMessages.updateBlogSuccess,
            }
          });
        } else {
          this.snackbar.openFromComponent(SnackbarComponent, {
            duration: SNACKBAR_DURATION,
            panelClass: [ESnackBarType.error],
            data: {
              message: EUpdateBlogMessages.updateBlogFailure,
            }
          });
        }
      },
      error => {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.error],
          data: {
            message: error.error.message,
          }
        });
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

          this.snackbar.openFromComponent(SnackbarComponent, {
            duration: SNACKBAR_DURATION,
            panelClass: [ESnackBarType.success],
            data: {
              message: EDeleteBlogMessages.deleteBlogSuccess,
            }
          });
        } else {
          this.snackbar.openFromComponent(SnackbarComponent, {
            duration: SNACKBAR_DURATION,
            panelClass: [ESnackBarType.error],
            data: {
              message: EDeleteBlogMessages.deleteBlogFailure,
            }
          });
        }
      },
      error => {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.error],
          data: {
            message: error.error.message,
          }
        });
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

          this.snackbar.openFromComponent(SnackbarComponent, {
            duration: SNACKBAR_DURATION,
            panelClass: [ESnackBarType.success],
            data: {
              message: ECreateBlogMessages.createBlogSuccess,
            }
          });

          this.getBlogs$.next(true);
        } else {
          this.snackbar.openFromComponent(SnackbarComponent, {
            duration: SNACKBAR_DURATION,
            panelClass: [ESnackBarType.error],
            data: {
              message: ECreateBlogMessages.createBlogFailure,
            }
          });
        }
      },
      error => {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.error],
          data: {
            message: error.error.message,
          }
        });
      });
  }

  likeBlog(blogId: number, username: string) {
    const payload = {
      username
    };

    const url = baseURL + apiEndpoints.likeBlog.replace('{id}', String(blogId));

    this.http.put(url, payload, {
      observe: "response"
    }).subscribe((response: HttpResponse<any>) => {
        console.log(response);
    },
      error => {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.error],
          data: {
            message: error.error.message,
          }
        });
      });
  }
}

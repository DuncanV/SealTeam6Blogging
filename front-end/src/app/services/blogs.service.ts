import { Injectable } from '@angular/core';
import {IContent} from "../common/Interfaces";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  // blogs$: Observable<IContent[]>;
  blogs$: IContent[] = [
    {
      id: '1',
      userId: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false
    },
    {
      id: '1',
      userId: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false
    },
    {
      id: '1',
      userId: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false
    },
    {
      id: '1',
      userId: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false
    },
    {
      id: '1',
      userId: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false
    },
    {
      id: '1',
      userId: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false
    },
    {
      id: '1',
      userId: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false
    },
    {
      id: '1',
      userId: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false
    }
  ]

  constructor() { }

  getBlogs(): Observable<IContent[]> {
    return of(this.blogs$);
  }
}

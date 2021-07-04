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
      id: 1,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only, dsaf sdf asdf asuidfgui asdkgfui ewquiebqwf uiebwfuil asbjifbsl fbasjklfbeuiw asdfvbashdfk jasdv fkjasvdf kasdvas dkfjavsdf jdf askdjlf kasjdhf klasjhd fkjbwe dlfkqjwe b asdfb asjkldfb jkasdfbl askjfbadsfjkl ',
      created: new Date(),
      deleted: false,
      visible: true
    },
    {
      id: 2,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: true
    },
    {
      id: 3,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: false
    },
    {
      id: 4,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: false
    },
    {
      id: 5,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: true
    },
    {
      id: 7,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: false
    },
    {
      id: 8,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: true
    },
    {
      id: 9,
      username: 'GerritBurger',
      title: 'First post by Gerrit',
      likes: ['Duncan', 'Wesley'],
      content: 'This is static content for testing purposes only',
      created: new Date(),
      deleted: false,
      visible: false
    }
  ]

  constructor() { }

  getBlogs(): Observable<IContent[]> {
    return of(this.blogs$);
  }
}

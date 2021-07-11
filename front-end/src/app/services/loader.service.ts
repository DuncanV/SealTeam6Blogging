import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showBlogsLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}

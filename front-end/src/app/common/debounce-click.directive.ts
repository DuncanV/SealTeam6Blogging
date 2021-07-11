import {Directive, HostListener, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {debounceTime} from "rxjs/operators";
import {Subject, Subscription} from "rxjs";

@Directive({
  selector: '[]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject();
  private subscription: Subscription = new Subscription();

  constructor() {}

  ngOnInit() {
    this.subscription = this.clicks
      .pipe(debounceTime(500))
      .subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}

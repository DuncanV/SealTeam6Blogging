import {animate, AUTO_STYLE, state, style, transition, trigger} from "@angular/animations";

const DEFAULT_DURATION = 500;

export const showMyBlogsAnimation = trigger('showMore', [
  state('true', style({height: AUTO_STYLE, padding: AUTO_STYLE, visibility: AUTO_STYLE})),
  state('false', style({height: '0', padding: '0', visibility: 'hidden'})),
  transition('true => false', animate(DEFAULT_DURATION + 'ms ease-in')),
  transition('false => true', animate(DEFAULT_DURATION + 'ms ease-out'))
]);

export const showDividerAnimation = trigger('showDivider', [
  state('true', style({width: AUTO_STYLE, visibility: AUTO_STYLE})),
  state('false', style({width: '0', visibility: 'hidden'})),
  transition('true => false', animate(DEFAULT_DURATION + 'ms ease-in')),
  transition('false => true', animate(DEFAULT_DURATION + 'ms ease-out'))
])

import {animate, state, style, transition, trigger} from "@angular/animations";

export const likeAnimation = trigger('blogIsLiked', [
  state('false', style({
    color: 'rgba(0, 0, 0)',
    opacity: '0.5',
    transform: 'scale(1)'
  })),
  state('true', style({
    color: '#e74c3c',
    opacity: '1',
    transform: 'scale(1.1)'
  })),
  transition('false <=> true', animate('100ms ease-out'))
])

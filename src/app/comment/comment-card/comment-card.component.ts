import { Component, Input } from '@angular/core';
import { CommentId } from 'src/app/shared/interfaces/comment';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent {
  @Input() comment: CommentId;

  constructor() { }
}

import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firestore } from 'firebase/app';
import { CommentService } from '../comment.service';
import { MemeId } from 'src/app/shared/interfaces/meme';
import { UserUid } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {
  @Input() meme: MemeId;
  commentForm: FormGroup;
  user: UserUid;

  constructor(private fb: FormBuilder,
    private commentService: CommentService,
    private authService: AuthService) {
    this.user = this.authService.currentUser;
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(280)]],
    })
  }

  commentHandler({ comment }: { comment: string, }) {
    this.commentService.addComment({
      comment,
      memeId: this.meme.id,
      authorId: this.user.uid,
      authorName: this.user.displayName,
      authorPhoto: this.user.photoURL,
      createdAt: firestore.FieldValue.serverTimestamp()
    });
    this.commentForm.reset();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, flatMap, tap, shareReplay } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Comment } from '../shared/interfaces/comment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentCollection: AngularFirestoreCollection<Comment>

  constructor(private userService: UserService,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar) {
    this.commentCollection = this.afs.collection<Comment>('comments');
  }

  addComment(comment: Comment): void {
    this.commentCollection.add(comment)
      .then(({ id }) => this.userService.pushToIdArray(id, 'comments'))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }

  getComments(memeId: string) {
    return this.afs.collection<Comment>('comments', ref =>
      ref.orderBy('createdAt', 'desc'))
      .snapshotChanges()
      .pipe(
        shareReplay(1),
        map(actions => actions.map(a => {
          const commentData = a.payload.doc.data() as Comment;
          const id = a.payload.doc.id;
          return { id, ...commentData }
        })),
        tap(a => console.log(a)),
        map(comments => comments.filter(comment => comment.memeId === memeId)),
        tap(a => console.log(a)),
      );
  }

  getCommentById(id: string) {
    return this.commentCollection.doc(id).snapshotChanges().pipe(
      map(a => {
        const commentData = a.payload.data() as Comment;
        const id = a.payload.id;
        return { id, ...commentData }
      }),
    )
  }

  getCommentListOfUser(uid: string) {
    return this.userService.getUser(uid)
      .pipe(
        map(a => a.comments.map((id: string) => this.getCommentById(id))),
        flatMap(observables => combineLatest(observables)),
        tap(a => console.log(a))
      )
  }
}

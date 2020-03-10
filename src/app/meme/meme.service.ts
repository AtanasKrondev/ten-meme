import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meme, MemeId } from '../shared/interfaces/meme';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  memeCollection: AngularFirestoreCollection<Meme>;
  memes: Observable<MemeId[]>;

  constructor(private afs: AngularFirestore,
    private userService: UserService,
    private router: Router,
  ) {
    this.memeCollection = this.afs.collection<Meme>('memes');
    this.memes = this.memeCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Meme;
          if(data.authorId){
            this.userService.getUser(data.authorId).subscribe(a => console.log(a))
          }
          const id = a.payload.doc.id;
          return { id, ...data };
        })))
  }

  addMeme(meme: Meme) {
    this.memeCollection.add(meme)
      .then((meme) => this.userService.pushMeme(meme.id))
      .then(() => this.router.navigate(['']))
      .catch(err => console.log(err));
  }

  getMemeById(id: string) {
    return this.memeCollection.doc(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Meme;
        const id = a.payload.id;
        return { id, ...data };
      })
    )
  }
}

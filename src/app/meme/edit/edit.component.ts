import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { MemeService } from '../meme.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap, } from 'rxjs/operators';
import { combineLatest } from 'rxjs'
import { UserUid } from 'src/app/shared/interfaces/user';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { regex } from 'src/app/shared/validators/regex.validator';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  uid$ = this.authService.getUid();
  id: string;
  meme$ = this.route.params.pipe(flatMap(({ id }) => this.memeService.getMemeById(id)));

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  currentUser: UserUid;
  editMemeForm: FormGroup;

  constructor(private fb: FormBuilder,
    private memeService: MemeService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    public dialog: MatDialog) {
    this.currentUser = this.authService.currentUser;
    combineLatest([this.uid$, this.meme$]).subscribe(([uid, { authorId }]) => { if (uid !== authorId) { this.router.navigate(['user', 'profile']) } })
    this.route.params.subscribe(params => this.id = params.id)
    this.editMemeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(140)]],
      imageUrl: ['', [Validators.required, Validators.pattern(regex.imageUrl)]],
      nsfw: false,
      tags: this.fb.array([]),
    })
    this.resetForm();
  }

  resetForm(): void {
    this.meme$.subscribe(meme => {
      this.editMemeForm.patchValue(meme)
      const tags = this.editMemeForm.get('tags') as FormArray;
      tags.clear()
      if (meme.tags) {
        meme.tags.forEach(tag => tags.push(new FormControl(tag)))
      }
    })
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.toLowerCase();
    const isValid = regex.tag.test(value)
    if (isValid) {
      const tags = this.editMemeForm.get('tags');
      if (!tags.value.includes(value) && (value || '').trim()) {
        (tags as FormArray).push(new FormControl(value.toLowerCase()));
      };
    }
    if (input) {
      input.value = '';
    };
  }

  removeTag(i: number): void {
    (this.editMemeForm.get('tags') as FormArray).removeAt(i);
  }

  editMemeHandler({ title, imageUrl, nsfw, tags }: { title: string, imageUrl: string, nsfw: boolean, tags: string[] }): void {
    this.currentUser = this.authService.currentUser;
    this.memeService.editMeme({
      title,
      imageUrl,
      nsfw,
      tags,
      authorName: this.currentUser.displayName,
      authorPhoto: this.currentUser.photoURL,
    }, this.id);
  }

  deleteMemeHandler(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.removeFromIdArray(this.id, 'uploads');
        this.memeService.deleteMeme(this.id);
      }
    })
  }

  goBack(): void {
    this._location.back();
  }
}

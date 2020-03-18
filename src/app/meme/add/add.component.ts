import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { firestore } from 'firebase/app';
import { MatChipInputEvent } from '@angular/material/chips';
import { MemeService } from '../meme.service';
import { regex } from '../../core/validators/regex.validator';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-add-meme',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddMemeComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  currentUser;
  addMemeForm: FormGroup;

  constructor(private fb: FormBuilder,
    private memeService: MemeService,
    private userService: UserService) {
    this.currentUser = this.userService.currentUser;
    this.addMemeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(140)]],
      imageUrl: ['', [Validators.required, Validators.pattern(regex.imageUrl)]],
      nsfw: false,
      tags: this.fb.array([]),
    })
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const tags = this.addMemeForm.get('tags');
    if (!tags.value.includes(value) && (value || '').trim()) {
      (tags as FormArray).push(new FormControl(value.toLowerCase()));
    };
    if (input) {
      input.value = '';
    };
  }

  removeTag(i: number): void {
    (this.addMemeForm.get('tags') as FormArray).removeAt(i);
  }

  addMemeHandler({ title, imageUrl, nsfw, tags }: { title: string, imageUrl: string, nsfw: boolean, tags: string[] }) {
    this.memeService.addMeme({
      title,
      imageUrl,
      nsfw,
      tags,
      authorId: this.currentUser.uid,
      authorName: this.currentUser.displayName,
      authorPhoto: this.currentUser.photoURL,
      createdAt: firestore.FieldValue.serverTimestamp()
    });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { regex } from '../../core/validators/regex.validator'

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

  addMemeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addMemeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(140)]],
      imageUrl: ['', [Validators.required, Validators.pattern(regex.imageUrl)]],
      nsfw: false,
      tags: this.fb.array([])
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const tags = this.addMemeForm.get('tags');

    if (!tags.value.includes(value) && (value || '').trim()) {
      (tags as FormArray).push(new FormControl(value));
    }

    if (input) {
      input.value = '';
    }
  }

  remove(i: number): void {
    (this.addMemeForm.get('tags') as FormArray).removeAt(i);
  }

  addMemeHandler({ title, imageUrl, nsfw, tags }:
    { title: string, imageUrl: string, nsfw: boolean, tags: [] }) {
    console.log(title, imageUrl, nsfw, tags);
    // console.log(this.addMemeForm.value)
  }
}

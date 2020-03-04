import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {
  authForm: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AuthDialogComponent>) {
    dialogRef.disableClose = true;
    this.authForm = this.fb.group({
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  authHandler(value) {
    this.dialogRef.close(value);
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { regex } from '../../shared/validators/regex.validator'
import { PasswordValidator } from 'src/app/shared/validators/password.validator';
import { AuthDialogComponent } from '../../auth/auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  displayNameForm: FormGroup;
  photoURLForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  currentUser;
  authDialogRef: MatDialogRef<AuthDialogComponent>

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog) {
    this.currentUser = this.authService.currentUser;
    this.displayNameForm = this.fb.group({
      displayName: [this.currentUser.displayName, Validators.required],
    })
    this.photoURLForm = this.fb.group({
      photoURL: [this.currentUser.photoURL, [Validators.required, Validators.pattern(regex.imageUrl)]]
    })
    this.emailForm = this.fb.group({
      email: [this.currentUser.email, [Validators.required, Validators.email]]
    })
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: PasswordValidator.MatchPassword })
  }

  openAuthDialog(formValue) {
    this.authDialogRef = this.dialog.open(AuthDialogComponent);
    this.authDialogRef.afterClosed()
      .subscribe(({ confirmPassword }) => {
        this.authService.handleAuthPrompt(confirmPassword, formValue);
      });
  }

  displayNameHandler(displayName: Object) {
    this.authService.updateDisplayName(displayName);
  }

  photoURLHandler(photoURL: Object) {
    this.authService.updatePhotoURL(photoURL);
  }
}

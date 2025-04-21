import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, map, pipe, catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { User } from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadService } from '../../services/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  imports: [NgIf, AsyncPipe, MatIconModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(
    private authService: AuthenticationService,
    private fileUploadService: FileUploadService,
    private snackBar: MatSnackBar
  ) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => console.log(user));
  }
  uploadImg(event: any, user: User) {
    this.fileUploadService
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        concatMap((photoURL: string) => {
          this.snackBar.open('Upload complete!', 'Close', {
            duration: 2000,
          });
          return this.authService.updateProfile({ photoURL });
        }),
        catchError((error) => {
          this.snackBar.open(
            'Error uploading image: ' + error.message,
            'Close',
            {
              duration: 2000,
            }
          );
          return throwError(error);
        })
      )
      .subscribe();
  }
}

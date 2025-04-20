import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@angular/fire/auth';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../../services/authentication.service';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, MatIconModule, NgIf, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private authService: AuthenticationService) {
    this.user$ = this.authService.currentUser$.pipe(
      map((user) => user ?? null)
    );
  }
  ngOnInit(): void {
    // Add initialization code here
  }
}

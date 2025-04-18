import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'promotexter';
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const tooltipModule = TooltipModule.forRoot();

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    BrowserModule,
    tooltipModule,
  ],
})
export class AppModule {}

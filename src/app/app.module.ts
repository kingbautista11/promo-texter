import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, BrowserModule, TooltipModule.forRoot()],
})
export class AppModule {}

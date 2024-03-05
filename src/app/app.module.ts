import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridCanvasComponent } from './grid-canvas/grid-canvas.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { KtdGridModule } from '@katoid/angular-grid-layout';

@NgModule({
  declarations: [
    AppComponent,
    GridCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [KtdGridModule]
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

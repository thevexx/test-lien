import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LinkComponent } from './link/link.component';
import { CardComponent } from './card/card.component';
import { LinkDirective } from './link.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, LinkComponent, CardComponent, LinkDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

import { Component, Inject } from '@angular/core';
import {DOCUMENT} from "@angular/common";


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  clicked() {
    alert('Info was clicked!');
  }
}
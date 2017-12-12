import { Component, ViewEncapsulation } from '@angular/core';
import {MediaReplayService} from "./core/sidenav/mediareplay/media-replay.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(mediaReplayService: MediaReplayService) { }
}

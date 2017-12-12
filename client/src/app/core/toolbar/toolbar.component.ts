import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'ms-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {

  @Input('quickpanel') quickpanel: any;
  @Input('sidenav') sidenav: any;
  isFullscreen: boolean = false;

  @ViewChildren('userButton') userButton: QueryList<ElementRef>;
  _userButtonWidth: any;

  get userButtonWidth() {
    return `${this._userButtonWidth}px`;
  }

  showBreadcrumbs: boolean = true;
  showFavorites: boolean = true;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this._userButtonWidth = this.userButton.first.nativeElement.clientWidth;
  }

  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }
}

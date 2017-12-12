import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SidenavService} from "../../sidenav/sidenav.service";
import {SidenavItem} from "../../sidenav/sidenav-item/sidenav-item.model";
import {Subscription} from "rxjs/Subscription";
import * as _ from 'lodash';
import {SortablejsOptions} from "angular-sortablejs";

@Component({
  selector: 'ms-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {

  sidenavItems: SidenavItem[] = [ ];
  currentFavorites: SidenavItem[] = [ ];


  _displayingItems: SidenavItem[] = [ ];
  get displayingItems() {
    if (this.searchValue) {
      return this.sidenavItems.filter((item) => {
        return item.name.toUpperCase().includes(this.searchValue.toUpperCase());
      });
    } else {
      return this.currentFavorites;
    }
  }

  searchValue: string;

  sortableOptions: SortablejsOptions = {
    animation: 200
  };

  private _sidenavItemsSubscriptions: Subscription;

  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    let addedDemoShortcuts: boolean = false;

    this._sidenavItemsSubscriptions = this.sidenavService.items$
      .subscribe((items: SidenavItem[]) => {
        items.forEach((item) => {
          this.merge(this.sidenavItems, item);

          // Used for default favorites - implement your own favorites-saving technique here
          if (!addedDemoShortcuts) {
            if (item.name === 'Chat' || item.name === 'WYSIWYG Editor' || item.name === 'Inbox' || item.name === 'Drag & Drop' || item.name === 'Calendar') {
              this.currentFavorites.push(item);
            }
          }
        });

        addedDemoShortcuts = true;
      });
  }

  merge(collector, item) {
    if (item.subItems && item.subItems.length > 0) {
      item.subItems.forEach((subItem) => {
        this.merge(collector, subItem);
      });
    }

    collector.push(item);
  }

  isFavorite(item: SidenavItem) {
    return (this.currentFavorites.indexOf(item) > -1);
  }

  toggleFavorite(item: SidenavItem) {
    let index = this.currentFavorites.indexOf(item);
    if (index > -1) {
      this.currentFavorites.splice(index, 1);
    } else {
      this.currentFavorites.push(item);
    }
  }

  clearSearchInput() {
    this.searchValue = '';
  }
}

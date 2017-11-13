import { Breadcrumb, BreadcrumbService } from 'shared/services/bread-crumb.service';
import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { Location } from '@angular/common';

@Component({
  selector: 'xiaoyuyue-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHeaderComponent extends AppComponentBase implements OnInit {
  @Output() toggleFlag: EventEmitter<boolean> = new EventEmitter();
  title: string;
  toggleSideBarFlag = false;
  iswxjsEnvironment = false;
  constructor(injector: Injector,
    private _location: Location,
    private breadcrumbService: BreadcrumbService
  ) {
    super(injector);

    this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
      this.title = this.createHearderTitle(this.breadcrumbService.breadcrumbs);
    });
  }

  ngOnInit() {
    // this.iswxjsEnvironment = (window.__wxjs_environment === 'miniprogram');
    this.iswxjsEnvironment = true;
  }

  showSideBar() {
    this.toggleSideBarFlag = true;
    this.toggleFlag.emit(this.toggleSideBarFlag);
  }

  back() {
    this._location.back();
  }

  createHearderTitle(routesCollection: Breadcrumb[]): string {

    const titles = routesCollection.filter((route) => route.displayName);

    return this.hearderTitlesToString(titles);
  }

  hearderTitlesToString(titles) {
    return titles.reduce((prev, curr) => {
      // return `${this.l(curr.displayName)} - ${prev}`;
      return `${this.l(curr.displayName)}`;
    }, '');
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Location } from '@angular/common';

@Component({
  selector: 'xiaoyuyue-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  @Output() toggleFlag: EventEmitter<boolean> = new EventEmitter();
  @Input() title: string;
  toggleSideBarFlag = false;

  constructor(
    private _location: Location
  ) { }

  ngOnInit() {
  }

  showSideBar() {
    this.toggleSideBarFlag = true;
    this.toggleFlag.emit(this.toggleSideBarFlag);
  }

  back() {
    this._location.back();
  }

}

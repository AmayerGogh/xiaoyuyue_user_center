import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'xiaoyuyue-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  @Output() toggleFlag: EventEmitter<boolean> = new EventEmitter();
  @Input() title: string;
  toggleSideBarFlag: boolean = false;

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

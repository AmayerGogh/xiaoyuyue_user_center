import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'xiaoyuyue-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggleSideBarFlag: boolean;
  @Output() toggleFlag: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  showSideBar() {
    this.toggleSideBarFlag = true;
    this.toggleFlag.emit(this.toggleSideBarFlag);
  }

}

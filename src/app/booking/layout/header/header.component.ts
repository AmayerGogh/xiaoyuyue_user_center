import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'xiaoyuyue-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleFlag: EventEmitter<boolean> = new EventEmitter();
  toggleSideBarFlag: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  showSideBar() {
    this.toggleSideBarFlag = true;
    this.toggleFlag.emit(this.toggleSideBarFlag);
  }

}

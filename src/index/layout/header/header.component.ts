import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xiaoyuyue-index-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class IndexHeaderComponent implements OnInit {
  isShowSubMenuFlag: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  isShowSubMenu() {
    this.isShowSubMenuFlag = !this.isShowSubMenuFlag;
  }

}

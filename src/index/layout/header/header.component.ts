import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'xiaoyuyue-index-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class IndexHeaderComponent implements OnInit {
  selectIndex: number;
  isShowSubMenuFlag: boolean = false;
  href : string = location.href;
  isDefaultSelect: boolean = this.href.substr(this.href.lastIndexOf("/") + 1, this.href.length).length > 0;
  menuArr: string[] = ["公众号","应用场景","关于我们"];

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    if (!this.isDefaultSelect) {
      this.selectIndex = 0;
    }
  }


  isShowSubMenu(index?: number) {
    this.isShowSubMenuFlag = !this.isShowSubMenuFlag;
    this.selectIndex = index;

    if (index == 1) {
      this._router.navigate(['/intro']);
    }
  }


}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MobileComponent implements OnInit {
    subMenuFlg: boolean;

  constructor() { }

  ngOnInit() {
  }

  isShowSubMenuFlag(flag: boolean): void {
      this.subMenuFlg = flag;
  }

}

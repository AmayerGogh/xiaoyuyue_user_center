import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class IndexComponent implements OnInit {
    subMenuFlg: boolean;

  constructor() { }

  ngOnInit() {
  }

  isShowSubMenuFlag(flag: boolean): void {
      this.subMenuFlg = flag;
  }

}

import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MobileComponent extends AppComponentBase implements OnInit {
    subMenuFlg: boolean;

    public constructor(
      injector: Injector
    ) {
      super(injector);
    }

  ngOnInit() {
  }

  isShowSubMenuFlag(flag: boolean): void {
      this.subMenuFlg = flag;
  }

}

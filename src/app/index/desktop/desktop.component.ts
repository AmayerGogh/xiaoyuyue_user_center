import { Component, Injector, OnInit } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
  selector: 'xiaoyuyue-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent extends AppComponentBase implements OnInit {

  public constructor(
    injector: Injector
  ) {
    super(injector);
  }


  ngOnInit() {
  }

}

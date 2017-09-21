import { Component, Injector, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
  selector: 'xiaoyuyue-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class BookingSideBarComponent extends AppComponentBase implements OnInit {

  href: string = document.location.href;
  bookingId;

  constructor(injector: Injector,
    private _route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit() {
    this.bookingId = this._route.snapshot.paramMap.get('id');
  }

}

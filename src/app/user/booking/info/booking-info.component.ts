import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { GetPersonBookingOrderOutput, PerBookingOrderServiceProxy } from 'shared/service-proxies/service-proxies';

import { AppComponentBase } from 'shared/common/app-component-base';
import { MediaCompressFormat } from "shared/AppConsts";
import { PictureUrlHelper } from './../../../../shared/helpers/PictureUrlHelper';
import { appModuleAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'xiaoyuyue-booking-info',
  templateUrl: './booking-info.component.html',
  styleUrls: ['./booking-info.component.scss'],
  animations: [appModuleAnimation()]
})
export class BookingInfoComponent extends AppComponentBase implements OnInit, AfterViewInit {
  bookingOrderForEdidData: GetPersonBookingOrderOutput;

  href: string = document.location.href;
  bookingId: any = +this.href.substr(this.href.lastIndexOf('/') + 1, this.href.length);

  constructor(
    injector: Injector,
    private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadBookingOrderForEditData(this.bookingId);
  }

  ngAfterViewInit() {
    // TODO: 暂时处理
    $('#headerTitle').text('应约详情');
  }

  loadBookingOrderForEditData(bookingId: number) {
    this._perBookingOrderServiceProxy
      .getBookingOrderForEdit(bookingId)
      .subscribe(result => {
        this.bookingOrderForEdidData = result;
        this.bookingOrderForEdidData.bookingInfo.outletPictureUrl =
          PictureUrlHelper.getOutletPicCompressUrl(this.bookingOrderForEdidData.bookingInfo.outletPictureUrl);
      })
  }

}

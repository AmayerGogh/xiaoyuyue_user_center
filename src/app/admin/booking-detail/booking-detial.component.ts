import { Component, OnInit, Injector } from '@angular/core';
import { PerBookingOrderServiceProxy, GetPersonBookingOrderOutput } from 'shared/service-proxies/service-proxies';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
  selector: 'xiaoyuyue-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent extends AppComponentBase implements OnInit {
  bookingOrderForEdidData: GetPersonBookingOrderOutput;

  href: string = document.location.href;
  bookingId: any = +this.href.substr(this.href.lastIndexOf("/") + 1, this.href.length);

  constructor(
    injector: Injector,
    private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadBookingOrderForEditData(this.bookingId);
  }

  loadBookingOrderForEditData(bookingId: number) {
    this._perBookingOrderServiceProxy
    .getBookingOrderForEdit(bookingId)
    .subscribe( result => {
      this.bookingOrderForEdidData = result;
      console.log(result)
    })
  }
}

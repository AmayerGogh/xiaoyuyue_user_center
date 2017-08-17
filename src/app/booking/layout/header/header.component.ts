import { Component, OnInit, Input } from '@angular/core';
import { OrganizationInfoDto, BookingServiceProxy } from 'shared/service-proxies/service-proxies';

@Component({
  selector: 'xiaoyuyue-booking-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class BookingHeaderComponent implements OnInit {
  href: string = document.location.href;
  bookingId: string = this.href.substr(this.href.lastIndexOf("/") + 1, this.href.length);

  source: string = "";
  organizationInfoData: OrganizationInfoDto;
  businessData: OrganizationInfoDto;
  constructor(
    private _bookingServiceProxy: BookingServiceProxy
  ) {
  }

  ngOnInit() {
    this.loadBookingData();
  }
  loadBookingData() {
    if (this.href.indexOf("?") >= 0) {
      this.bookingId = this.bookingId.split("?")[0];
    }
    this._bookingServiceProxy
      .getJoinBookingInfo(this.source, parseInt(this.bookingId))
      .subscribe(result => {
        this.organizationInfoData = result.organizationInfo;
      })
  }
}

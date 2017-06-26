import { Component, OnInit, Input } from '@angular/core';
import { OrganizationInfoDto, BookingServiceProxy } from 'shared/service-proxies/service-proxies';

@Component({
  selector: 'xiaoyuyue-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class BookingHeaderComponent implements OnInit {
  href: string = document.location.href;
  bookingId: number = +this.href.substr(this.href.lastIndexOf("/") + 1, this.href.length);
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
        this._bookingServiceProxy
            .getJoinBookingInfo(this.source, this.bookingId)
            .subscribe(result => {
                this.organizationInfoData = result.organizationInfo;
            })
    }
}

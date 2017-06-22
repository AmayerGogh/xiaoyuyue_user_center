import { Component, OnInit, Input } from '@angular/core';
import { OrganizationInfoDto, BookingServiceProxy } from 'shared/service-proxies/service-proxies';

@Component({
  selector: 'xiaoyuyue-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class BookingHeaderComponent implements OnInit {
  bookingId: number = 40;
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

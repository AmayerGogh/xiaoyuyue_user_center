import { BookingServiceProxy, OrganizationInfoDto } from 'shared/service-proxies/service-proxies';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'xiaoyuyue-booking-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class BookingHeaderComponent implements OnInit {

  @Input()
  organizationInfoData: OrganizationInfoDto;

  constructor(
    private _bookingServiceProxy: BookingServiceProxy
  ) {
  }

  ngOnInit() {
  }
}

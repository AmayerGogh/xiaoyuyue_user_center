import { Component, OnInit } from '@angular/core';
import { PersonBookingServiceProxy, GetPersonBookingOrderOutput } from 'shared/service-proxies/service-proxies';

@Component({
  selector: 'xiaoyuyue-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  bookingOrderForEdidData: GetPersonBookingOrderOutput;

  href: string = document.location.href;
  bookingId: any = +this.href.substr(this.href.lastIndexOf("/") + 1, this.href.length);

  constructor(
    private _personBookingServiceProxy: PersonBookingServiceProxy
  ) { }

  ngOnInit() {
    this.loadBookingOrderForEditData(this.bookingId);
  }

  loadBookingOrderForEditData(bookingId: number) {
    this._personBookingServiceProxy
    .getBookingOrderForEdit(bookingId)
    .subscribe( result => {
      this.bookingOrderForEdidData = result;
    })
  }
}

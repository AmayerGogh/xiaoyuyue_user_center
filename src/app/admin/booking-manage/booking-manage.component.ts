import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PersonBookingServiceProxy, PersonBookingOrderListDto } from "shared/service-proxies/service-proxies";
import { AppConsts } from '@shared/AppConsts';
import { SortDescriptor } from '@progress/kendo-data-query';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CancelBookingModalComponent } from '../cancel-booking-modal/cancel-booking-modal.component';

@Component({
  selector: 'xiaoyuyue-booking-manage',
  templateUrl: './booking-manage.component.html',
  styleUrls: ['./booking-manage.component.scss']
})
export class BookingManageComponent extends AppComponentBase implements OnInit {
  personBookingDatas: PersonBookingOrderListDto[];
  bookingName: string = "";
  pageSize: number = AppConsts.grid.defaultPageSize;
  skip: number = 0;
  sort: Array<SortDescriptor> = [];

  @ViewChild('cancelBookingModal') cancelBookingModal: CancelBookingModalComponent;

  constructor(
    injector: Injector,
    private _router: Router,
    private _personBookingServiceProxy: PersonBookingServiceProxy
  ) {
    super(
      injector
    );
  }

  ngOnInit() {
    this.loadPersonBookingData();
  }
  loadPersonBookingData() {
    let state = { skip: this.skip, take: this.pageSize, sort: this.sort };

    let maxResultCount, skipCount, sorting;
    if (state) {
      maxResultCount = state.take;
      skipCount = state.skip
      if (state.sort.length > 0 && state.sort[0].dir) {
        sorting = state.sort[0].field + " " + state.sort[0].dir;
      }
    }

    this._personBookingServiceProxy
      .getBookingOrders(this.bookingName, sorting, maxResultCount, skipCount)
      .subscribe(result => {
        this.personBookingDatas = result.items;
      });
  }

  showBookingDetail(bookingId: number) {
    this._router.navigate(['/app/admin/detail', bookingId]);
  }

  cancelBooking(bookingId: number) {
    this.cancelBookingModal.show(bookingId);
  }

  skickBooking() {

  }
}

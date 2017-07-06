import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PerBookingOrderServiceProxy } from "shared/service-proxies/service-proxies";
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Status3, BookingOrderListDto } from '@shared/service-proxies/service-proxies';
import { AppStatus } from "shared/AppEnums";
import { CancelBookingModalComponent } from "app/admin/cancel-booking-modal/cancel-booking-modal.component";

@Component({
  selector: 'xiaoyuyue-booking-manage',
  templateUrl: './booking-manage.component.html',
  styleUrls: ['./booking-manage.component.scss']
})
export class BookingManageComponent extends AppComponentBase implements OnInit {
  personBookingDatas: BookingOrderListDto[];
  status: Status3[] = [AppStatus.State1, AppStatus.State2, AppStatus.State5];
  bookingName: string = "";
  pageSize: number = AppConsts.grid.defaultPageSize;
  skip: number = 0;
  sort: any;
  actionFlag: boolean = false;

  @ViewChild('cancelBookingModal') cancelBookingModal: CancelBookingModalComponent;

  constructor(
    injector: Injector,
    private _router: Router,
    private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
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
      // if (state.sort.length > 0 && state.sort[0].dir) {
      //   sorting = state.sort[0].field + " " + state.sort[0].dir;
      // }
    }

    this._perBookingOrderServiceProxy
      .getBookingOrders(this.bookingName, this.status , sorting, maxResultCount, skipCount)
      .subscribe(result => {
        this.personBookingDatas = result.items;
      });
  }

  showBookingDetail(bookingId: number) {
    this._router.navigate(['/manage/bookingorder/detail', bookingId]);
  }

  cancelBooking(bookingId: number) {
    this.cancelBookingModal.show(bookingId);
  }

  skickBooking() {

  }

  setActionFlag() {
    this.actionFlag = !this.actionFlag;
  }
}

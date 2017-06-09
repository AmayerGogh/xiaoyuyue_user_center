import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from "shared/animations/routerTransition";
import { AppComponentBase } from "shared/common/app-component-base";
import { NgxAni } from "ngxani";
import { OrganizationBookingServiceProxy, PagedResultDtoOfBookingListDto, BookingListDto, CreateOrUpdateBookingInput } from "shared/service-proxies/service-proxies";
import { AppConsts } from "shared/AppConsts";
import { SortDescriptor } from "@progress/kendo-data-query/dist/es/sort-descriptor";

import * as moment from 'moment';
import { Router } from "@angular/router";

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss'],
  animations: [appModuleAnimation()]
})

export class ManageBookingComponent extends AppComponentBase implements OnInit {

  organizationBookingResultData: BookingListDto[];

  endCreationTime: moment.Moment;
  startCreationTime: moment.Moment;

  // endCreationTime: string;
  // startCreationTime: string;
  isActive: boolean;
  outletId: number;
  bookingName: string;

  disabledBooking: Array<boolean> = new Array();

  pageSize: number = AppConsts.grid.defaultPageSize;
  skip: number = 0;
  sort: Array<SortDescriptor> = [];

  constructor(
    injector: Injector,
    private _ngxAni: NgxAni,
    private _router: Router,
    private _organizationBookingServiceProxy: OrganizationBookingServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadData();
    var Greeting = (function () { function Greeting() { } Greeting.prototype.greet = function () { console.log("Hello World!!!"); }; }());
  }

  ngAfterViewInit() {
    $(".startCreationTime").flatpickr();
    $(".endCreationTime").flatpickr();
  }


  loadData() {
    let state = { skip: this.skip, take: this.pageSize, sort: this.sort };

    let maxResultCount, skipCount, sorting;
    if (state) {
      maxResultCount = state.take;
      skipCount = state.skip
      if (state.sort.length > 0 && state.sort[0].dir) {
        sorting = state.sort[0].field + " " + state.sort[0].dir;
      }
    }
    this.startCreationTime ? moment(this.startCreationTime) : undefined;
    this.endCreationTime ? moment(this.endCreationTime) : undefined;

    this._organizationBookingServiceProxy
      .getBookingsAsync(this.bookingName, this.outletId, this.isActive, this.startCreationTime, this.endCreationTime, sorting, maxResultCount, skipCount)
      .subscribe(result => {
        this.organizationBookingResultData = result.items;
      })
  }
  getMoment(arg: string) {
    if (arg === undefined) return undefined;
    return moment(arg);
  }

  editHandler(bookingId: number) {
    this._router.navigate(['app/admin/booking/edit', bookingId]);
  }

  // 正面翻转到背面
  flipToBack(flipAni: any, event) {
    this._ngxAni.to(flipAni, .6, {
      transform: "rotateY(180deg)"
    })
  }

  // 背面翻转到正面
  flipToFront(flipAni: any, event) {
    this._ngxAni.to(flipAni, .6, {
      transform: "rotateY(0)"
    })
  }

  // 禁用预约样式
  disabledBookingClass(disabledAni: any, index) {
    this._ngxAni.to(disabledAni, .6, {
      "filter": "grayscale(100%)"
    })
    this.disabledBooking[index] = !this.disabledBooking[index];
    this._organizationBookingServiceProxy
      .disableBooking(index)
      .subscribe();
  }

  // 显示禁用之前预约样式
  beforeBookingClass(disabledAni: any, index) {
    this._ngxAni.to(disabledAni, .6, {
      "filter": "grayscale(0)"
    })
    this.disabledBooking[index] = !this.disabledBooking[index];
  }

  // 复制预约
  copyBooking(index) {
    let bookingId = this.organizationBookingResultData[index].id;
    let input = new CreateOrUpdateBookingInput();
    this._organizationBookingServiceProxy
      .getBookingForEdit(bookingId)
      .subscribe(result => {

        input.booking = result.booking;
        input.bookingPictures = result.bookingPicture;
        input.items = result.items;

        // 创建预约
        this._organizationBookingServiceProxy
          .createOrUpdateBooking(input)
          .subscribe()
      });

  }
}

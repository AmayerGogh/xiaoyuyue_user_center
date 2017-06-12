import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from "shared/animations/routerTransition";
import { AppComponentBase } from "shared/common/app-component-base";
import { NgxAni } from "ngxani";
import { OrganizationBookingServiceProxy, PagedResultDtoOfBookingListDto, BookingListDto, CreateOrUpdateBookingInput, OutletServiceServiceProxy, SelectListItemDto, EntityDtoOfInt64 } from "shared/service-proxies/service-proxies";
import { AppConsts } from "shared/AppConsts";
import { SortDescriptor } from "@progress/kendo-data-query/dist/es/sort-descriptor";

import * as moment from 'moment';
import { Router } from "@angular/router";
import { SelectHelper } from "shared/helpers/SelectHelper";

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss'],
  animations: [appModuleAnimation()]
})

export class ManageBookingComponent extends AppComponentBase implements OnInit {
  outletSelectDefaultItem: string;
  outletSelectListData: SelectListItemDto[];
  bookingActiveSelectListData: Object[] = SelectHelper.defaultList();
  bookingActiveSelectDefaultItem: object;

  organizationBookingResultData: BookingListDto[];

  endCreationTime: any;
  startCreationTime: any;

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
    private _outletServiceServiceProxy: OutletServiceServiceProxy,
    private _organizationBookingServiceProxy: OrganizationBookingServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadData();
    // this.bookingActiveSelectDefaultItem = this.bookingActiveSelectListData[0];
    // console.log(this.bookingActiveSelectDefaultItem.displayText)
    this.bookingActiveSelectDefaultItem = {
            value: "",
            displayText: "是否激活"
        };
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
    this.startCreationTime = this.startCreationTime ? moment(this.startCreationTime) : undefined;
    this.endCreationTime = this.endCreationTime ? moment(this.endCreationTime) : undefined;

    // 获取可用下拉框数据源
    this._outletServiceServiceProxy
      .getOutletSelectList()
      .subscribe(result => {
        // 添加请选择数据源
        let input = new SelectListItemDto();
        input.text = "请选择门店";
        input.value = "0";
        this.outletSelectListData = result;
        this.outletSelectListData.unshift(input);
        this.outletSelectDefaultItem = result[0].value;
      })

    this._organizationBookingServiceProxy
      .getBookingsAsync(this.bookingName, this.outletId, this.isActive, this.startCreationTime, this.endCreationTime, sorting, maxResultCount, skipCount)
      .subscribe(result => {
        if (typeof this.startCreationTime === "object") {
          this.startCreationTime = this.startCreationTime.format('YYYY-MM-DD');
          this.endCreationTime = this.endCreationTime.format('YYYY-MM-DD');
        }
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
    let disabledId: EntityDtoOfInt64 = new EntityDtoOfInt64();
    disabledId.id = this.organizationBookingResultData[index].id;
    this._organizationBookingServiceProxy
      .disableBooking(disabledId)
      .subscribe(result => {
        this.notify.success("已关闭预约!");
      });
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
        input.bookingPictures = result.bookingPictures;
        input.items = result.items;

        // 创建预约
        this._organizationBookingServiceProxy
          .createOrUpdateBooking(input)
          .subscribe(() => {
            this.loadData();
            this.notify.success("复制成功！");
          })
      });

  }

  // 删除预约
  removeBooking(index) {
    let bookingId = this.organizationBookingResultData[index].id;
    this._organizationBookingServiceProxy
      .deleteBooking(bookingId)
      .subscribe(() => {
        this.loadData();
        this.notify.success("删除成功！");
      });
  }

  // 门店搜索下拉框值改变时
  public outletChangeHandler(outlet: any): void {
    this.outletId = outlet;
  }
  // 预约状态搜索下拉框值改变时
  public bookingActiveChangeHandler(bookingActive: any): void {
    this.isActive = bookingActive;
  }
}

import { Component, OnInit, ViewEncapsulation, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from "shared/animations/routerTransition";
import { AppComponentBase } from "shared/common/app-component-base";
import { JoinBookingDataInfo, BookingServiceProxy, JoinBookingInput } from 'shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { OptimalBookingTimeModelComponent } from './optimal-booking-time-model/optimal-booking-time-model.component';
import { ReplyBookingModelComponent } from './reply-booking-model/reply-booking-model.component';

@Component({
  selector: 'xiaoyuyue-booking-time',
  templateUrl: './booking-time.component.html',
  styleUrls: ['./booking-time.component.scss'],
  animations: [appModuleAnimation()],
  encapsulation: ViewEncapsulation.None
})
export class BookingTimeComponent extends AppComponentBase implements OnInit {
  selectIndex: number;
  enableBookingDate: Date[] = [];
  selectDate: Date = undefined;
  input: JoinBookingInput = new JoinBookingInput();

  bookingId: number = 41;
  source: string = "";
  availableDateItemData: JoinBookingDataInfo[] = [];

  @ViewChild('optimalBookingTimeModel') optimalBookingTimeModel: OptimalBookingTimeModelComponent;
  @ViewChild('replyBookingModel') replyBookingModel: ReplyBookingModelComponent;
  public constructor(
    injector: Injector,
    private _bookingServiceProxy: BookingServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadBookingData();
  }
  ngAfterViewInit() {
  }
  
  loadBookingData() {
    let self = this;
    this._bookingServiceProxy
      .getJoinBookingInfo(this.source, this.bookingId)
      .subscribe(result => {
        this.availableDateItemData = result.availableDateItem;
        // 测试, 如果没有选择时间段,那么就赋值默认的一个id
        this.input.bookingItemId = this.availableDateItemData[0].hasOwnProperty("times") ? this.availableDateItemData[0].times[0].id : 0;
        for (let i = 0; i < result.availableDateItem.length; i++) {
          this.enableBookingDate.push(new Date(result.availableDateItem[i].date.toDate()));
        }
        $(".flatpickr").flatpickr({
          inline: true,
          minDate: "today",
          "locale": "zh",
          enable: self.enableBookingDate,
          onChange: function (selectedDates, dateStr, instance) {
            self.input.date = moment(new Date(selectedDates));
            self.optimalBookingTimeModel.show();
            self.optimalBookingTimeModel.save(self.input);
          },
          // enable: ["2017-06-22", "2017-06-23"]
        })
      })
  }

  getBookingItemId(index) {
    this.selectIndex = index;
    this.replyBookingModel.show();
  }
}

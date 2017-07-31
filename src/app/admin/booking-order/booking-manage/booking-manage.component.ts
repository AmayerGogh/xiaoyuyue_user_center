import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PerBookingOrderServiceProxy } from "shared/service-proxies/service-proxies";
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Status3, BookingOrderListDto, StickedInput } from '@shared/service-proxies/service-proxies';
import { AppStatus } from "shared/AppEnums";
import { CancelBookingModalComponent } from "app/admin/booking-order/cancel-booking-modal/cancel-booking-modal.component";

@Component({
    selector: 'xiaoyuyue-booking-manage',
    templateUrl: './booking-manage.component.html',
    styleUrls: ['./booking-manage.component.scss']
})
export class BookingManageComponent extends AppComponentBase implements OnInit {
    currentTabIndex: number = 0;
    personBookingTotalCount: number;
    personBookingDatas: BookingOrderListDto[];
    stickedInput: StickedInput = new StickedInput();
    status: Status3[] =[AppStatus.State1, AppStatus.State2, AppStatus.State3, AppStatus.State4, AppStatus.State5];
    bookingName: string = "";
    // pageSize: number = AppConsts.grid.defaultPageSize;
    pageSize: number;
    skip: number = 0;
    sort: any;
    actionFlag: boolean[] = [];
    slogan: string = "啥都没有，赶紧去预约吧";
    bookingOrderStatusName: string[] = ["全部", "待确认", "已确认", "待评价", "已完成"];

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
    ngAfterViewInit() {
        // TODO: 暂时处理
        $("#headerTitle").text("应约管理");
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
            .getBookingOrders(this.bookingName, this.status, sorting, maxResultCount, skipCount)
            .subscribe(result => {
                this.personBookingDatas = result.items;
                this.personBookingTotalCount = result.totalCount;
            });
    }

    orderSwitch(index: number): void {
        this.currentTabIndex = index;
        if (index == 0) {
            this.status = [AppStatus.State1, AppStatus.State2, AppStatus.State3, AppStatus.State4, AppStatus.State5];
        } else if (index == 1) {
            this.status = [AppStatus.State1];
        } else if (index == 2) {
            this.status = [AppStatus.State2];
        } else if (index == 4) {
            this.status = [AppStatus.State4];
        } else if (index == 5) {
            this.status = [AppStatus.State5];
        } else {
            this.message.warn("努力完善中", "敬请期待");
        }
        this.loadPersonBookingData();
    }

    orderSerach(keywords: string): void {
        console.log(true);
        this.bookingName = keywords;
        this.status = [AppStatus.State1, AppStatus.State2, AppStatus.State3, AppStatus.State4, AppStatus.State5];
        this.loadPersonBookingData();
    }

    showBookingDetail(bookingId: number) {
        this._router.navigate(['/app/admin/order/detail', bookingId]);
    }

    cancelBooking(bookingId: number) {
        this.cancelBookingModal.show(bookingId);
    }

    skickBooking(id): void {
        this.stickedInput = new StickedInput();
        this.stickedInput.id = id;
        this.stickedInput.sticked = true;
        this._perBookingOrderServiceProxy
        .stickedBookingOrder(this.stickedInput)
        .subscribe( () => {
            this.notify.success("置顶成功");
            this.loadPersonBookingData();
        });
    }

    setActionFlag(index: number) {
        for (let i = 0; i < this.actionFlag.length; i++) {
            this.actionFlag[i] = false;
        }
        this.actionFlag[index] = !this.actionFlag[index];
    }

    setTipsClass(status: number): any {
        let tipsClass = {
            status1: status == 1,
            status2: status == 2,
            status3: status == 3,
            status4: status == 4,
            status5: status == 5
        }
        return tipsClass;
    }
}

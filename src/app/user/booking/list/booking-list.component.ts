import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BookingOrderListDto, StickedInput } from '@shared/service-proxies/service-proxies';
import { PerBookingOrderServiceProxy, Status2 } from 'shared/service-proxies/service-proxies';

import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { AppStatus } from 'shared/AppEnums';
import { BookingCancelComponent } from './../cancel/booking-cancel.component';
import { Router } from '@angular/router';
import { appModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss'],
    animations: [appModuleAnimation()]
})
export class BookingListComponent extends AppComponentBase implements OnInit, AfterViewInit {
    isLoaded: boolean = false;
    isLoading: boolean = false;
    infiniteScrollDistance: number = 2;
    infiniteScrollThrottle: number = 300;
    currentTabIndex = 0;
    personBookingTotalCount: number;
    allPrsonBookingDatas: any[] = [];
    personBookingDatas: BookingOrderListDto[];
    stickedInput: StickedInput = new StickedInput();
    status: Status2[] = [AppStatus.State1, AppStatus.State2, AppStatus.State3, AppStatus.State4, AppStatus.State5];
    bookingName = '';
    pageSize: number = 10;
    skip = 0;
    sort: any;
    actionFlag: boolean[] = [];
    slogan = '啥都没有，赶紧去预约吧';
    bookingOrderStatusName: string[] = ['全部', '待确认', '已确认', '待评价', '已取消'];

    @ViewChild('cancelBookingModal') cancelBookingModal: BookingCancelComponent;

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
        $('#headerTitle').text('应约管理');
    }
    loadPersonBookingData() {
        const state = { skip: this.skip, take: this.pageSize, sort: this.sort };

        let maxResultCount, skipCount, sorting;
        if (state) {
            maxResultCount = state.take;
            skipCount = state.skip
            // if (state.sort.length > 0 && state.sort[0].dir) {
            //   sorting = state.sort[0].field + " " + state.sort[0].dir;
            // }
        }
        this.isLoading = true;
        this._perBookingOrderServiceProxy
            .getBookingOrders(this.bookingName, this.status, sorting, maxResultCount, skipCount)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(result => {
                this.personBookingDatas = result.items;
                this.allPrsonBookingDatas.push(this.personBookingDatas);
                this.personBookingTotalCount = result.totalCount;
            });
    }

    orderSwitch(index: number): void {
        this.currentTabIndex = index;
        if (index === 0) {
            this.status = [AppStatus.State1, AppStatus.State2, AppStatus.State3, AppStatus.State4, AppStatus.State5];
        } else if (index === 1) {
            this.status = [AppStatus.State1];
        } else if (index === 2) {
            this.status = [AppStatus.State2];
        } else if (index === 4) {
            this.status = [AppStatus.State4];
        } else if (index === 5) {
            this.status = [AppStatus.State5];
        } else {
            this.message.warn('努力完善中', '敬请期待');
            this.allPrsonBookingDatas = [];
            this.skip = 0;
            return;
        }
        this.allPrsonBookingDatas = [];
        this.skip = 0;
        this.loadPersonBookingData();
    }

    orderSerach(keywords: string): void {
        this.bookingName = keywords;
        this.status = [AppStatus.State1, AppStatus.State2, AppStatus.State3, AppStatus.State4, AppStatus.State5];
        this.loadPersonBookingData();
    }

    showBookingDetail(bookingId: number) {
        this._router.navigate(['/user/booking/info', bookingId]);
    }

    cancelBooking(bookingId: number) {
        this.cancelBookingModal.show(bookingId);
    }

    // 取消或者置顶预约
    toggleSkickBooking(id: number, toggleFlag: boolean): void {
        this.stickedInput = new StickedInput();
        this.stickedInput.id = id;
        this.stickedInput.sticked = toggleFlag;
        this._perBookingOrderServiceProxy
            .stickedBookingOrder(this.stickedInput)
            .subscribe(() => {
                this.notify.success('置顶成功');
                this.loadPersonBookingData();
            });
    }

    setActionFlag(index: number) {
        this.actionFlag[index] = !this.actionFlag[index];
        this.actionFlag.forEach((element, i) => {
            if (i !== index) {
                this.actionFlag[i] = false;
            } else {
                this.actionFlag[index] = !!this.actionFlag[index];
            }
        });
    }

    setTipsClass(status: number): any {
        const tipsClass = {
            status1: status === 1,
            status2: status === 2,
            status3: status === 3,
            status4: status === 4,
            status5: status === 5
        }
        return tipsClass;
    }

    getIsCancelBooking(event: boolean): void {
        if (event) {
            this.loadPersonBookingData();
        }
    }

    public onScrollDown(): void {

        if (this.skip > (this.personBookingTotalCount-this.pageSize)) {
            this.isLoaded = true;
            return;
        }
        this.skip += this.pageSize;
        this.loadPersonBookingData();
    }
}

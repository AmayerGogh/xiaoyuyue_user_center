import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BookingOrderListDto, StickedInput } from '@shared/service-proxies/service-proxies';
import { PerBookingOrderServiceProxy, Status2 } from 'shared/service-proxies/service-proxies';

import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { BookingCancelComponent } from './../cancel/booking-cancel.component';
import { BookingOrderStatus } from 'shared/AppEnums';
import { ClientTypeHelper } from 'shared/helpers/ClientTypeHelper';
import { Router } from '@angular/router';
import { appModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss'],
    animations: [appModuleAnimation()]
})
export class BookingListComponent extends AppComponentBase implements OnInit {
    isLoaded = false;
    isLoading = false;
    infiniteScrollDistance = 1;
    infiniteScrollThrottle = 300;
    currentTabIndex = 0;
    personBookingTotalCount: number;
    allPrsonBookingDatas: any[] = [];
    personBookingDatas: BookingOrderListDto[];
    stickedInput: StickedInput = new StickedInput();
    status: Status2[] = [BookingOrderStatus.WaitConfirm, BookingOrderStatus.ConfirmSuccess, BookingOrderStatus.ConfirmFail, BookingOrderStatus.Cancel, BookingOrderStatus.WaitComment, BookingOrderStatus.Complete];
    bookingName = '';
    pageSize = 10;
    skip = 0;
    sort: any;
    actionFlag: boolean[] = [];
    slogan = this.l('BookingList.Nothing');
    bookingOrderStatusName: string[] = [this.l('BookingList.All'), this.l('BookingList.WaitConfirm'),
    this.l('BookingList.ConfirmSuccess'),
    this.l('BookingList.WaitComment'),
    this.l('BookingList.Cancel')];
    updateDataIndex = -1;

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

    loadPersonBookingData() {
        if (this.skip < 0) { this.skip = 0 };

        this.isLoading = true;
        this._perBookingOrderServiceProxy
            .getBookingOrders(this.bookingName, this.status, this.sort, this.pageSize, this.skip)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(result => {
                this.personBookingDatas = result.items;
                this.personBookingTotalCount = result.totalCount;

                if (this.personBookingDatas.length > 0 && this.updateDataIndex < 0) {
                    this.allPrsonBookingDatas.push(this.personBookingDatas);
                } else {
                    this.allPrsonBookingDatas[this.updateDataIndex] = this.personBookingDatas;
                }
            });
    }

    orderSwitch(index: number): void {
        this.currentTabIndex = index;
        if (index === 0) {
            this.status = [BookingOrderStatus.WaitConfirm, BookingOrderStatus.ConfirmSuccess, BookingOrderStatus.ConfirmFail, BookingOrderStatus.Cancel, BookingOrderStatus.WaitComment, BookingOrderStatus.Complete];
        } else if (index === 1) {
            this.status = [BookingOrderStatus.WaitConfirm];
        } else if (index === 2) {
            this.status = [BookingOrderStatus.ConfirmSuccess];
        } else if (index === 4) {
            this.status = [BookingOrderStatus.Cancel];
        } else if (index === 5) {
            this.status = [BookingOrderStatus.WaitComment];
        } else {
            this.message.warn(this.l('Improving'), this.l('ComingSoon'));
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
        this.status = [BookingOrderStatus.WaitConfirm, BookingOrderStatus.ConfirmSuccess, BookingOrderStatus.ConfirmFail, BookingOrderStatus.Cancel, BookingOrderStatus.WaitComment, BookingOrderStatus.Complete];
        this.loadPersonBookingData();
    }

    showBookingDetail(bookingId: number) {
        const bookingUrl = '/user/booking/info/' + bookingId;
        if (!ClientTypeHelper.isWeChatMiniProgram) {
            this._router.navigate([bookingUrl]);
        } else {
            wx.miniProgram.redirectTo({
                url: `/pages/user-center/user-center?route=${encodeURIComponent(bookingUrl)}`
            })
        }
    }

    cancelBooking(bookingId: number, indexI: number) {
        this.updateDataIndex = indexI;
        this.cancelBookingModal.show(bookingId);
    }

    // 置顶或者取消置顶预约
    toggleSkickBooking(id: number, toggleFlag: boolean, indexI: number): void {
        this.stickedInput = new StickedInput();
        this.stickedInput.id = id;
        this.stickedInput.sticked = toggleFlag;

        this.updateDataIndex = indexI;
        this.skip = this.pageSize * this.updateDataIndex;
        this._perBookingOrderServiceProxy
            .stickedBookingOrder(this.stickedInput)
            .subscribe(() => {
                if (toggleFlag) {
                    this.notify.success(this.l('StickSuccessed'));
                } else {
                    this.notify.success(this.l('CancelStick'));
                }
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

    /* 是否可以取消预约 */
    isCancelBooking(currentStatus: number): boolean {
        if (currentStatus === BookingOrderStatus.Cancel || currentStatus === BookingOrderStatus.WaitComment || currentStatus === BookingOrderStatus.Complete) { return false; };
        return true;
    }

    public onScrollDown(): void {
        this.updateDataIndex = -1;
        let totalCount = 0;
        this.allPrsonBookingDatas.forEach(personBookingDatas => {
            personBookingDatas.forEach(element => {
                totalCount++;
            });
        });
        this.skip = totalCount;

        if (this.skip >= this.personBookingTotalCount) {
            return;
        }
        this.loadPersonBookingData();
    }
}

import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BookingOrderListDto, StickedInput } from '@shared/service-proxies/service-proxies';
import { PerBookingOrderServiceProxy, Status2 } from 'shared/service-proxies/service-proxies';

import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { BookingCancelComponent } from './../cancel/booking-cancel.component';
import { BookingOrderStatus } from 'shared/AppEnums';
import { ClientTypeHelper } from 'shared/helpers/ClientTypeHelper';
import { Router } from '@angular/router';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { ScrollStatusOutput } from 'app/shared/utils/list-scroll.dto';
import { ListScrollService } from 'shared/services/list-scroll.service';

@Component({
    selector: 'xiaoyuyue-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class BookingListComponent extends AppComponentBase implements OnInit {
    listScrollHeight = 'calc(100vh - 115px)';
    showSerachInputActive = false;
    scrollStatusOutput: ScrollStatusOutput = new ScrollStatusOutput();
    isLoaded = false;
    isLoading = false;
    currentTabIndex = 0;
    personBookingTotalCount: number;
    allPrsonBookingDatas: any[] = [];
    personBookingDatas: BookingOrderListDto[];
    stickedInput: StickedInput = new StickedInput();
    status: Status2[] = [
        BookingOrderStatus.WaitConfirm,
        BookingOrderStatus.ConfirmSuccess,
        BookingOrderStatus.ConfirmFail,
        BookingOrderStatus.Cancel,
        BookingOrderStatus.WaitComment,
        BookingOrderStatus.Complete];
    bookingName = '';
    pageSize = 10;
    skipCount = 0;
    sort: any;
    actionFlag: boolean[] = [];
    slogan = this.l('BookingList.Nothing');
    bookingOrderStatusName: string[] = [
        this.l('BookingList.All'),
        this.l('BookingList.WaitConfirm'),
        this.l('BookingList.ConfirmSuccess'),
        this.l('BookingList.ConfirmFail'),
        this.l('BookingList.Cancel'),
        this.l('BookingList.WaitComment'),
        this.l('BookingList.Complete')];
    updateDataIndex = -1;

    @ViewChild('cancelBookingModal') cancelBookingModal: BookingCancelComponent;

    constructor(
        injector: Injector,
        private _router: Router,
        private _listScrollService: ListScrollService,
        private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
    ) {
        super(
            injector
        );
    }

    ngOnInit() {
        this.loadData();
    }

    // scrollHandleBack: 接收一个回调函数，控制下拉刷新，上拉加载的状态
    loadData(scrollHandleBack?: any) {
        if (this.skipCount < 0) { this.skipCount = 0 };

        this.isLoading = true;
        this._perBookingOrderServiceProxy
            .getBookingOrders(this.bookingName, this.status, this.sort, this.pageSize, this.skipCount)
            .finally(() => {
                this.isLoading = false;
                scrollHandleBack && scrollHandleBack();
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

    pullDownRefresh(): void {
        this.updateDataIndex = 0;
        this.skipCount = 0;
        this.scrollStatusOutput = new ScrollStatusOutput();
        this.scrollStatusOutput.pulledDownActive = true;
        this._listScrollService.listScrollFinished.emit(this.scrollStatusOutput);
        this.loadData(() => {
            this.scrollStatusOutput = new ScrollStatusOutput();
            this.scrollStatusOutput.pulledDownActive = false;
            this._listScrollService.listScrollFinished.emit(this.scrollStatusOutput);
        });
    }

    pullUpLoad(): void {
        this.updateDataIndex = -1;
        let totalCount = 0;
        this.allPrsonBookingDatas.forEach(personBookingTotalCount => {
            personBookingTotalCount.forEach(element => {
                totalCount++;
            });
        });
        this.skipCount = totalCount;
        if (this.skipCount >= this.personBookingTotalCount) {
            this.scrollStatusOutput = new ScrollStatusOutput();
            this.scrollStatusOutput.noMore = true;
            this._listScrollService.listScrollFinished.emit(this.scrollStatusOutput);
            return;
        }
        this.scrollStatusOutput = new ScrollStatusOutput();
        this.scrollStatusOutput.pulledUpActive = true;
        this._listScrollService.listScrollFinished.emit(this.scrollStatusOutput);
        this.loadData(() => {
            this.scrollStatusOutput = new ScrollStatusOutput();
            this.scrollStatusOutput.pulledUpActive = false;
            this._listScrollService.listScrollFinished.emit(this.scrollStatusOutput);
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
        } else if (index === 6) {
            this.status = [BookingOrderStatus.Complete];
        } else {
            this.message.warn(this.l('Improving'), this.l('ComingSoon'));
            this.allPrsonBookingDatas = [];
            this.skipCount = 0;
            return;
        }
        this.allPrsonBookingDatas = [];
        this.skipCount = 0;
        this.loadData();
    }

    orderSerach(keywords: string): void {
        this.bookingName = keywords;
        this.status = [BookingOrderStatus.WaitConfirm, BookingOrderStatus.ConfirmSuccess, BookingOrderStatus.ConfirmFail, BookingOrderStatus.Cancel, BookingOrderStatus.WaitComment, BookingOrderStatus.Complete];
        this.loadData();
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
        this.skipCount = this.pageSize * this.updateDataIndex;
        this._perBookingOrderServiceProxy
            .stickedBookingOrder(this.stickedInput)
            .subscribe(() => {
                if (toggleFlag) {
                    this.notify.success(this.l('StickSuccessed'));
                } else {
                    this.notify.success(this.l('CancelStick'));
                }
                this.loadData();
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

    getIsCancelBooking(event: boolean): void {
        if (event) {
            this.loadData();
        }
    }

    /* 是否可以取消预约 */
    isCancelBooking(currentStatus: number): boolean {
        if (currentStatus === BookingOrderStatus.Cancel || currentStatus === BookingOrderStatus.WaitComment || currentStatus === BookingOrderStatus.Complete) { return false; };
        return true;
    }

    /* 切换显示搜索框 */
    toggleSerachInput(): void {
        this.showSerachInputActive = !this.showSerachInputActive;
        // 调整.scroll-wrapper的位置，并通知better-scroll，重绘DOM
        if (this.showSerachInputActive) {
            this.listScrollHeight = 'calc(100vh - 171px)';
            $('.scroll-wrapper').css({
                'height': this.listScrollHeight,
                'top': '116px'
            })
        } else {
            this.listScrollHeight = 'calc(100vh - 115px)';
            $('.scroll-wrapper').css({
                'height': this.listScrollHeight,
                'top': '60px'
            })
        }
        this._listScrollService.listScrollRefresh.emit();
    }
}

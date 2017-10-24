import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { GetPersonBookingOrderOutput, PerBookingOrderServiceProxy } from 'shared/service-proxies/service-proxies';

import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'shared/common/app-component-base';
import { MediaCompressFormat } from 'shared/AppConsts';
import { PictureUrlHelper } from 'shared/helpers/PictureUrlHelper';
import { appModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-booking-info',
    templateUrl: './booking-info.component.html',
    styleUrls: ['./booking-info.component.scss'],
    animations: [appModuleAnimation()]
})
export class BookingInfoComponent extends AppComponentBase implements OnInit, AfterViewInit {
    bookingOrderForEdidData: GetPersonBookingOrderOutput;

    href: string = document.location.href;
    bookingId;
    outletPictureUrl: string = '/assets/common/images/booking/tenant-bg.png';

    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
    ) {
        super(injector);
        this.bookingId = this._route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.loadBookingOrderForEditData(this.bookingId);
    }

    ngAfterViewInit() {
        // TODO: 暂时处理
        $('#headerTitle').text('应约详情');
    }

    loadBookingOrderForEditData(bookingId: number) {
        this._perBookingOrderServiceProxy
            .getBookingOrderForEdit(bookingId)
            .subscribe(result => {
                this.bookingOrderForEdidData = result;
                this.bookingOrderForEdidData.bookingInfo.outletPictureUrl = this.getOutletPictureUrl(this.bookingOrderForEdidData.bookingInfo.outletPictureUrl);
            })
    }

    private getOutletPictureUrl(url: string): string {
        return url === '' ? this.outletPictureUrl : PictureUrlHelper.getOutletPicCompressUrl(url);
    }

}

import * as _ from 'lodash';

import { BookingServiceProxy, JoinBookingInfoDto, JoinBookingOutput } from 'shared/service-proxies/service-proxies';
import { Component, Injector, Input, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Observable } from 'rxjs/Rx';
import { PictureUrlHelper } from 'shared/helpers/PictureUrlHelper';

@Component({
    templateUrl: './booking.component.html',
    styleUrls: [
        './booking.component.scss',
    ],
    encapsulation: ViewEncapsulation.None
})
export class BookingComponent extends AppComponentBase implements OnInit {

    href: string = document.location.href;
    bookingId;
    source = '';
    bookingData: JoinBookingOutput;

    public constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _bookingServiceProxy: BookingServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.loadBookingData();
    }

    loadBookingData() {
        this.bookingId = this._route.snapshot.paramMap.get('id');
        this._bookingServiceProxy
            .getJoinBookingInfo(this.source, parseInt(this.bookingId, null))
            .subscribe(result => {
                this.bookingData = result;
                this.bookingData.bookingInfo.pictures = _.map(this.bookingData.bookingInfo.pictures, PictureUrlHelper.getBookingPicCompressUrl);
            });
    }
}

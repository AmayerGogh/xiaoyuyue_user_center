import * as ngCommon from '@angular/common';

import { HttpModule, JsonpModule } from '@angular/http';
import { ModalModule, TabsModule, TooltipModule } from 'ngx-bootstrap';

import { AccessRecordService } from 'shared/services/access-record.service';
import { AppCommonModule } from 'app/shared/common/app-common.module';
import { BookedComponent } from './booked/booked.component';
import { BookingAboutComponent } from './about/booking-about.component';
import { BookingCommentsComponent } from './comments/booking-comments.component';
import { BookingComponent } from './booking.component';
import { BookingHeaderComponent } from './layout/header/header.component';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingService } from 'shared/services/booking.service';
import { BookingSideBarComponent } from './layout/side-bar/side-bar.component';
import { BookingTimeComponent } from './time/booking-time.component';
import { CommonModule } from 'shared/common/common.module';
import { FooterAdComponent } from './layout/footer-ad/footer-ad.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OptimalBookingTimeModelComponent } from './time/optimal-booking-time-model/optimal-booking-time-model.component';
import { ReplyBookingModelComponent } from './time/reply-booking-model/reply-booking-model.component';
import { UtilsModule } from 'shared/utils/utils.module';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        BookingRoutingModule,

        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),

        AppCommonModule,
        UtilsModule
    ],
    declarations: [
        BookingComponent,
        BookingHeaderComponent,
        BookingSideBarComponent,
        BookingAboutComponent,
        BookingTimeComponent,
        BookingCommentsComponent,
        OptimalBookingTimeModelComponent,
        ReplyBookingModelComponent,
        BookedComponent,
        FooterAdComponent
    ],
    providers: [
        BookingService,
        AccessRecordService
    ]
})
export class BookingModule {

}

import * as ngCommon from '@angular/common';

import { HttpModule, JsonpModule } from '@angular/http';
import { ModalModule, TabsModule, TooltipModule } from 'ngx-bootstrap';

import { AppCommonModule } from 'app/shared/common/app-common.module';
import { BookedComponent } from './booked/booked.component';
import { BookingAboutComponent } from './about/booking-about.component';
import { BookingCommentsComponent } from './comments/booking-comments.component';
import { BookingComponent } from './booking.component';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingTimeComponent } from './time/booking-time.component';
import { CommonModule } from 'shared/common/common.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OptimalBookingTimeModelComponent } from './time/optimal-booking-time-model/optimal-booking-time-model.component';
import { ReplyBookingModelComponent } from './time/reply-booking-model/reply-booking-model.component';
import { UtilsModule } from 'shared/utils/utils.module';
import { BusinessMapsModelComponent } from './about/business-maps-model/business-maps-model.component';
import { ContactorModelComponent } from './about/contactor-model/contactor-model.component';
import { BookingHeaderComponent } from './layout/header/header.component';
import { TenantDetailModelComponent } from './layout/tenant-detail-model/tenant-detail-model.component';

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
        BookingAboutComponent,
        BookingTimeComponent,
        BookingCommentsComponent,
        OptimalBookingTimeModelComponent,
        ReplyBookingModelComponent,
        BookedComponent,
        BookingHeaderComponent,
        BusinessMapsModelComponent,
        ContactorModelComponent,
        TenantDetailModelComponent
    ],
    providers: [
    ]
})
export class BookingModule {

}

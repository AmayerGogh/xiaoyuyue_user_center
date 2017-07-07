import * as ngCommon from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BookingRoutingModule } from "booking/booking-routing.module";
import { BookingComponent } from "booking/booking.component";
import { BookingHeaderComponent } from "booking/layout/header/header.component";
import { BookingSideBarComponent } from "booking/layout/side-bar/side-bar.component";
import { BookingTimeComponent } from "booking/time/booking-time.component";
import { BookingAboutComponent } from "booking/about/booking-about.component";
import { BookingRatingComponent } from "booking/rating/booking-rating.component";
import { BookingServiceProxy } from "shared/service-proxies/service-proxies";
import { ModalModule, TooltipModule } from "ngx-bootstrap";
import { FileUploadModule } from "ng2-file-upload";
import { AbpModule } from "abp-ng2-module/src/abp.module";
import { AppRoutingModule } from "app/app-routing.module";
import { UtilsModule } from "shared/utils/utils.module";
import { AppCommonModule } from "app/shared/common/app-common.module";
import { ServiceProxyModule } from "shared/service-proxies/service-proxy.module";
import { BookingService } from "shared/services/booking.service";
import { OptimalBookingTimeModelComponent } from './time/optimal-booking-time-model/optimal-booking-time-model.component';
import { ReplyBookingModelComponent } from './time/reply-booking-model/reply-booking-model.component';
import { BookedComponent } from './booked/booked.component';
import { FooterAdComponent } from "booking/layout/footer-ad/footer-ad.component";

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        BookingRoutingModule,
        ngCommon.CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,

        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        FileUploadModule,

        AbpModule,

        AppRoutingModule,

        UtilsModule,
        AppCommonModule.forRoot(),
        ServiceProxyModule,
    ],
    declarations: [
        BookingComponent,
        BookingHeaderComponent,
        BookingSideBarComponent,
        BookingAboutComponent,
        BookingTimeComponent,
        BookingRatingComponent,
        OptimalBookingTimeModelComponent,
        ReplyBookingModelComponent,
        BookedComponent,
        FooterAdComponent
    ],
    providers: [
        BookingServiceProxy,
        BookingService
    ]
})
export class BookingModule {

}
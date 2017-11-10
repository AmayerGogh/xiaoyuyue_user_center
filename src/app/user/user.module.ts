import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';

import { AppCommonModule } from 'app/shared/common/app-common.module';
import { AppModule } from 'app';
import { BookingCancelComponent } from './booking/cancel/booking-cancel.component';
import { BookingInfoComponent } from './booking/info/booking-info.component';
import { BookingListComponent } from './booking/list/booking-list.component';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserInfoComponent } from './info/user-info.component';
import { UserRoutingModule } from './user-routing.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { QrcodeModelComponent } from 'app/user/booking/info/qrcode-model/qrcode-model.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        InfiniteScrollModule,

        UserRoutingModule,
        UtilsModule,
        AppCommonModule,
    ],
    declarations: [
        UserComponent,
        BookingInfoComponent,
        BookingListComponent,
        BookingCancelComponent,
        UserInfoComponent,
        QrcodeModelComponent,
    ],
    providers: [
    ],
    bootstrap: [UserComponent]
})
export class UserModule {

}

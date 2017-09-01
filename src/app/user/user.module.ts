import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';

import { AppCommonModule } from 'app/shared/common/app-common.module';
import { AppStorageService } from 'shared/services/storage.service';
import { BookingCancelComponent } from './booking/cancel/booking-cancel.component';
import { BookingInfoComponent } from './booking/info/booking-info.component';
import { BookingListComponent } from './booking/list/booking-list.component';
import { CommonModule } from '@angular/common';
import { EmptyPageComponent } from './shared/empty-page/empty-page.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { TenantService } from 'shared/services/tenant.service';
import { UserComponent } from './user.component';
import { UserFooterComponent } from './layout/footer/footer.component';
import { UserHeaderComponent } from './layout/header/header.component';
import { UserInfoComponent } from './info/user-info.component';
import { UserRoutingModule } from './user-routing.module';
import { UserSideBarComponent } from 'app/user/layout/side-bar/side-bar.component';
import { UtilsModule } from '@shared/utils/utils.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        InfiniteScrollModule,

        UserRoutingModule,
        UtilsModule,
        AppCommonModule,
    ],
    declarations: [
        UserComponent,
        BookingInfoComponent,
        UserHeaderComponent,
        UserFooterComponent,
        UserSideBarComponent,
        BookingListComponent,
        BookingCancelComponent,
        UserInfoComponent,
        EmptyPageComponent
    ],
    providers: [
        TenantService,
    ],
    bootstrap: [UserComponent]
})
export class UserModule {

}

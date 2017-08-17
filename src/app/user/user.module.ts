import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';

import { AppCommonModule } from 'app/shared/common/app-common.module';
import { AppStorageService } from 'shared/services/storage.service';
import { BookingInfoComponent } from './booking-order/booking-detail/booking-detial.component';
import { BookingManageComponent } from './booking-order/booking-manage/booking-manage.component';
import { CancelBookingModalComponent } from './booking-order/cancel-booking-modal/booking-cancel.component';
import { CommonModule } from '@angular/common';
import { EmptyPageComponent } from './shared/empty-page/empty-page.component';
import { FileUploadModule } from '@node_modules/ng2-file-upload';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { TenantService } from 'shared/services/tenant.service';
import { UserComponent } from './user.component';
import { UserFooterComponent } from './layout/footer/footer.component';
import { UserHeaderComponent } from './layout/header/header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { UserSideBarComponent } from 'app/admin/layout/side-bar/side-bar.component';
import { UtilsModule } from '@shared/utils/utils.module'

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        FileUploadModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),

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
        BookingManageComponent,
        CancelBookingModalComponent,
        UserProfileComponent,
        EmptyPageComponent
    ],
    providers: [
        TenantService,
    ],
    bootstrap: [UserComponent]
})
export class UserModule {

}

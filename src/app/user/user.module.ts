import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';

import { AppCommonModule } from 'app/shared/common/app-common.module';
import { AppStorageService } from 'shared/services/storage.service';
import { BookingCancelComponent } from './booking/cancel/booking-cancel.component';
import { BookingInfoComponent } from './booking/info/booking-info.component';
import { BookingListComponent } from './booking/list/booking-list.component';
import { BookingModule } from './../booking/booking.module';
import { CommonModule } from '@angular/common';
import { EmptyPageComponent } from './shared/empty-page/empty-page.component';
import { FileUploadModule } from '@node_modules/ng2-file-upload';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { IndexModule } from './../index/index.module';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { SettingsModule } from './settings/settings.module';
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
        HomeModule,
        IndexModule,
        BookingModule,
        SettingsModule,
        FileUploadModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),

        UserRoutingModule,
        UtilsModule,
        AppCommonModule,
    ],
    declarations: [
        UserComponent,
        HomeComponent,

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

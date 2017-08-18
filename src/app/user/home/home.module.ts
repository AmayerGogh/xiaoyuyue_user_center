import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';

import { AppCommonModule } from 'app/shared/common/app-common.module';
import { AppStorageService } from 'shared/services/storage.service';
import { CommonModule } from '@angular/common';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { FileUploadModule } from '@node_modules/ng2-file-upload';
import { HomeComponent } from 'app/user/home/home.component';
import { HomeHeaderComponent } from 'app/user/home/layout/header/home-header.component';
import { HomeSideBarComponent } from 'app/user/home/layout/side-bar/home-side-bar.component';
import { NgModule } from '@angular/core';
import { TenantService } from 'shared/services/tenant.service';
import { TimeLineComponent } from './time-line/time-line.component';
import { UtilsModule } from '@shared/utils/utils.module';

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

        UtilsModule,
        AppCommonModule,
    ],
    declarations: [
        TimeLineComponent,
        HomeSideBarComponent,
        HomeHeaderComponent,
        EmptyPageComponent
    ],
    providers: [
        AppStorageService,
        HomeSideBarComponent,
        HomeHeaderComponent,
        TenantService
    ]
})
export class HomeModule {
}

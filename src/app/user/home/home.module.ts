import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';

import { AppCommonModule } from 'app/shared/common/app-common.module';
import { AppStorageService } from 'shared/services/storage.service';
import { CommonModule } from '@angular/common';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { FileUploadModule } from '@node_modules/ng2-file-upload';
import { HomeComponent } from 'app/user/home/home.component';
import { NgModule } from '@angular/core';
import { TenantService } from 'shared/services/tenant.service';
import { TimeLineComponent } from './time-line/time-line.component';
import { UserHeaderComponent } from 'app/user/layout/header/header.component';
import { UserSideBarComponent } from 'app/user/layout/side-bar/side-bar.component';
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

        UtilsModule,
        AppCommonModule,
    ],
    declarations: [
        TimeLineComponent,
        HomeComponent,
        UserHeaderComponent,
        UserSideBarComponent,
        EmptyPageComponent
    ],
    providers: [
        AppStorageService,
        TenantService
    ]
})
export class HomeModule {
}

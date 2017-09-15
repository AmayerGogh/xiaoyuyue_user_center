import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';

import { AppCommonModule } from 'app/shared/common/app-common.module';
import { CommonModule } from '@angular/common';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { HomeComponent } from './home.component';
import { HomeHeaderComponent } from 'app/home/layout/header/home-header.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeSideBarComponent } from 'app/home/layout/side-bar/home-side-bar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { TimeLineComponent } from './time-line/time-line.component';
import { UtilsModule } from '@shared/utils/utils.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        InfiniteScrollModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),

        HomeRoutingModule,
        UtilsModule,
        AppCommonModule,
    ],
    declarations: [
        HomeComponent,
        TimeLineComponent,
        HomeSideBarComponent,
        HomeHeaderComponent,
        EmptyPageComponent
    ],
    providers: [
        HomeSideBarComponent,
        HomeHeaderComponent
    ]
})
export class HomeModule {
}

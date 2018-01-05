import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideComponent } from './guide.component';
import { HowToCreateComponent } from './how-to-create/how-to-create.component';
import { HowToBookingComponent } from './how-to-booking/how-to-booking.component';
import { HowToManageComponent } from './how-to-manage/how-to-manage.component';
import { GuideRoutes } from 'app/sitemaps/guide/guide.routing';
import { AppCommonModule } from 'app/shared/common/app-common.module';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        GuideRoutes
    ],
    declarations: [
        GuideComponent,
        HowToCreateComponent,
        HowToBookingComponent,
        HowToManageComponent
    ]
})
export class GuideModule { }
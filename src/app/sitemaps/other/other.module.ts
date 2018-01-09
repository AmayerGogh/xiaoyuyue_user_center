import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherComponent } from './other.component';
import { InformantComponent } from './informant/informant.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CaseComponent } from './case/case.component';
import { OtherRoutes } from 'app/sitemaps/other/other.routing';
import { AppCommonModule } from 'app/shared/common/app-common.module';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        OtherRoutes
    ],
    declarations: [
        OtherComponent,
        InformantComponent,
        FeedbackComponent,
        CaseComponent
    ]
})
export class OtherModule { }
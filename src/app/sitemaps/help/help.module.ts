import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { ProblemComponent } from './problem/problem.component';
import { CustomServiceComponent } from './custom-service/custom-service.component';
import { NoticeComponent } from './notice/notice.component';
import { HelpRoutes } from 'app/sitemaps/help/help.routing';
import { AppCommonModule } from 'app/shared/common/app-common.module';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        HelpRoutes
    ],
    declarations: [
        HelpComponent,
        ProblemComponent,
        CustomServiceComponent,
        NoticeComponent
    ]
})
export class HelpModule { }
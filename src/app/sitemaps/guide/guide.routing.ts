import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProblemComponent } from 'app/sitemaps/help/problem/problem.component';
import { CustomServiceComponent } from 'app/sitemaps/help/custom-service/custom-service.component';
import { NoticeComponent } from 'app/sitemaps/help/notice/notice.component';
import { HowToManageComponent } from 'app/sitemaps/guide/how-to-manage/how-to-manage.component';
import { HowToBookingComponent } from 'app/sitemaps/guide/how-to-booking/how-to-booking.component';
import { HowToCreateComponent } from 'app/sitemaps/guide/how-to-create/how-to-create.component';
import { GuideComponent } from 'app/sitemaps/guide/guide.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: GuideComponent,
                children: [
                    { path: '', redirectTo: 'create-tenant', pathMatch: 'full' },
                    {
                        path: 'create-tenant',
                        component: HowToCreateComponent
                    },
                    {
                        path: 'create-booking',
                        component: HowToBookingComponent
                    },
                    {
                        path: 'manage-booking',
                        component: HowToManageComponent
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class GuideRoutes {

}

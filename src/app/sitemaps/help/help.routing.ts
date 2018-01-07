import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HelpComponent } from 'app/sitemaps/help/help.component';
import { ProblemComponent } from 'app/sitemaps/help/problem/problem.component';
import { CustomServiceComponent } from 'app/sitemaps/help/custom-service/custom-service.component';
import { NoticeComponent } from 'app/sitemaps/help/notice/notice.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: HelpComponent,
                children: [
                    { path: '', redirectTo: 'problem', pathMatch: 'full' },
                    {
                        path: 'problem',
                        component: ProblemComponent
                    },
                    {
                        path: 'contacthelp',
                        component: CustomServiceComponent
                    },
                    {
                        path: 'notice',
                        component: NoticeComponent
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class HelpRoutes {

}

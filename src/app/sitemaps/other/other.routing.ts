import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OtherComponent } from 'app/sitemaps/other/other.component';
import { InformantComponent } from 'app/sitemaps/other/informant/informant.component';
import { FeedbackComponent } from 'app/sitemaps/other/feedback/feedback.component';
import { CaseComponent } from 'app/sitemaps/other/case/case.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: OtherComponent,
                children: [
                    { path: '', redirectTo: 'informant', pathMatch: 'full' },
                    {
                        path: 'informant',
                        component: InformantComponent
                    },
                    {
                        path: 'feedback',
                        component: FeedbackComponent
                    },
                    {
                        path: 'case',
                        component: CaseComponent
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class OtherRoutes {

}

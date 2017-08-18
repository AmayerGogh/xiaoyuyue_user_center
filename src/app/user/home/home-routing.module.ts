import { Router, RouterModule } from '@angular/router';

import { AdminPermissions } from '@shared/AdminPermissions';
import { HomeComponent } from 'app/user/home/home.component';
import { NgModule } from '@angular/core';
import { TimeLineComponent } from './time-line/time-line.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent,
                children: [
                    {
                        path: '', component: TimeLineComponent
                    },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {

}

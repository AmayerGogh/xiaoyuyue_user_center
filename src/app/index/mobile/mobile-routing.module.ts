import { RouterModule, Routes } from '@angular/router';

import { DeviceSwtichGuard } from 'app/shared/common/auth/device-switch.service';
import { HomeComponent } from './home/home.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { MobileComponent } from './mobile.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                canActivateChild: [DeviceSwtichGuard],
                component: MobileComponent,
                children: [
                    { path: '', component: HomeComponent, canActivate: [DeviceSwtichGuard] },
                    { path: 'intro', component: IntroductionComponent, data: { breadcrumb: 'Menu.Intro' } },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class MobileRoutingModule { }
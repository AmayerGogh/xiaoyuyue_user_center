import { RouterModule, Routes } from '@angular/router';

import { DeviceSwtichGuard } from "app/shared/common/auth/device-switch.service";
import { HomeComponent } from './home/home.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { MobileComponent } from './mobile.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                canActivate: [DeviceSwtichGuard],
                // canActivateChild: [DeviceSwtichGuard],
                component: MobileComponent,
                children: [
                    { path: '', component: HomeComponent },
                    { path: 'intro', component: IntroductionComponent },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class MobileRoutingModule { }
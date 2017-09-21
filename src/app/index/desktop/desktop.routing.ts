import { RouterModule, Routes } from '@angular/router';

import { DesktopComponent } from './desktop.component';
import { DeviceSwtichGuard } from 'app/shared/common/auth/device-switch.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [DeviceSwtichGuard],
        //   canActivateChild: [DeviceSwtichGuard],
        component: DesktopComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            }
        ]
    },
];

export const DesktopRoutingModule = RouterModule.forChild(routes);

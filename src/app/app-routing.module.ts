import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { HomeComponent } from 'mobile/home/home.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'app',
                canActivate: [AppRouteGuard],
                canActivateChild: [AppRouteGuard],
                children: [
                    {
                        path: 'admin',
                        loadChildren: 'app/admin/admin.module#BookingOrderModule',
                        data: { preload: true }
                    },
                    {
                        path: 'center',
                        loadChildren: 'app/center/center.module#CenterModule',
                        data: { preload: true }
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
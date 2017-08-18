import { Router, RouterModule } from '@angular/router';

import { AdminPermissions } from '@shared/AdminPermissions';
import { AppRouteGuard } from 'app/shared/common/auth/auth-route-guard';
import { BookingInfoComponent } from './booking/info/booking-info.component';
import { BookingListComponent } from './booking/list/booking-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserInfoComponent } from './info/user-info.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'user',
                canActivate: [AppRouteGuard],
                canActivateChild: [AppRouteGuard],
                component: UserComponent,
                children: [
                    {
                        path: '',
                        component: HomeComponent
                    },
                    {
                        path: 'booking',
                        children: [
                            { path: '', redirectTo: 'list' },
                            {
                                path: 'list', component: BookingListComponent
                            },
                            {
                                path: 'info/:id', component: BookingInfoComponent
                            }
                        ]
                    },
                    {
                        path: 'info',
                        children: [
                            {
                                path: '', component: UserInfoComponent
                            }
                        ]
                    },
                    {
                        path: 'settings',
                        loadChildren: 'app/user/settings/settings.module#SettingsModule'
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule {
}

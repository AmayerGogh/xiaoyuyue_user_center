import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { AdminPermissions } from '@shared/AdminPermissions';
import { AppRouteGuard } from 'app/shared/common/auth/auth-route-guard';
import { BookingInfoComponent } from './booking/info/booking-info.component';
import { BookingListComponent } from './booking/list/booking-list.component';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserInfoComponent } from './info/user-info.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                canActivate: [AppRouteGuard],
                canActivateChild: [AppRouteGuard],
                component: UserComponent,
                children: [
                    { path: '', redirectTo: '/user/home', pathMatch: 'full' },
                    {
                        path: 'booking',
                        children: [
                            {
                                path: 'list', component: BookingListComponent, data: { breadcrumb: 'Menu.ManageBooking' }
                            },
                            {
                                path: 'info/:id', component: BookingInfoComponent, data: { breadcrumb: 'Menu.BookingInfo' }
                            }
                        ]
                    },
                    {
                        path: 'info',
                        children: [
                            {
                                path: '', component: UserInfoComponent, data: { breadcrumb: 'Menu.Account.BaseInfo' }
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
    iswxjsEnvironment = false;
    constructor(private router: Router) {
        this.iswxjsEnvironment = true;

        router.events.subscribe((event: NavigationEnd) => {
            setTimeout(() => {
                this.toggleBodyCssClass(event.url);
            }, 0);
        });
    }

    toggleBodyCssClass(url: string): void {
        if (url && url.indexOf('/booking/') >= 0) {
            $('#footer').addClass('hidden');
        } else {
            $('#footer').removeClass('hidden');
        }

        if (this.iswxjsEnvironment) {
            $('.booking-manage').css('top', '0px');
            $('.booking-edit').css('top', '0px');

            $('.booking-manage').css('padding-top', '0px');
            $('.user-profile').css('padding-top', '60px');
        }
    }
}

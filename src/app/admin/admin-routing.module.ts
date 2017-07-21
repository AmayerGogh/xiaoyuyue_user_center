import { AdminPermissions } from '@shared/AdminPermissions';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AdminComponent } from "app/admin/admin.component";
import { BookingManageComponent } from 'app/admin/booking-order/booking-manage/booking-manage.component';
import { BookingDetailComponent } from "app/admin/booking-order/booking-detail/booking-detial.component";
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AdminComponent,
                children: [
                    {
                        path: 'order',
                        children: [
                            { path: '', redirectTo: 'list' },
                            {
                                path: 'list', component: BookingManageComponent
                            },
                            {
                                path: 'detail/:id', component: BookingDetailComponent
                            }
                        ]
                    },
                    {
                        path: 'user',
                        children: [
                            {
                                path: '', component: UserProfileComponent
                            }
                        ]
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {
    constructor(private router: Router) {
        router.events.subscribe(() => {
            this.hideOpenJTableDropdownMenus();
        });
    }

    hideOpenJTableDropdownMenus(): void {
        var $dropdownMenus = $('.dropdown-menu.tether-element');
        $dropdownMenus.css({
            'display': 'none'
        });
    }
}
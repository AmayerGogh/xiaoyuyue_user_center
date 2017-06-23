import { AdminPermissions } from '@shared/AdminPermissions';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BookingManageComponent } from "app/admin/booking-manage/booking-manage.component";
import { AdminComponent } from "app/admin/admin.component";
import { BookingDetailComponent } from './booking-detail/booking-detial.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AdminComponent,
                children: [
                    { path: '', redirectTo: 'manage' },
                    {
                        path: 'manage', component: BookingManageComponent
                    },
                    {
                        path: 'detail/:id', component: BookingDetailComponent
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
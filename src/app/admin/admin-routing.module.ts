import { AdminPermissions } from '@shared/AdminPermissions';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BookingManageComponent } from "app/admin/booking-manage/booking-manage.component";
import { BookingEditComponent } from "app/admin/booking-edit/booking-edit.component";
import { AdminComponent } from "app/admin/admin.component";

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
                        path: 'detail', component: BookingEditComponent
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
import { AdminPermissions } from '@shared/AdminPermissions';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BookingManageComponent } from "app/booking/booking-manage/booking-manage.component";
import { BookingComponent } from "app/booking/booking.component";
import { BookingEditComponent } from "app/booking/booking-edit/booking-edit.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: BookingComponent,
                children: [
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
import { Router, RouterModule } from '@angular/router';

import { AdminPermissions } from '@shared/AdminPermissions';
import { HomeComponent } from 'app/user/home/home.component';
import { NgModule } from '@angular/core';
import { TimeLineComponent } from './time-line/time-line.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent,
                children: [
                    {
                        path: '', component: TimeLineComponent
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
        const $dropdownMenus = $('.dropdown-menu.tether-element');
        $dropdownMenus.css({
            'display': 'none'
        });
    }
}

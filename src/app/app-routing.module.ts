import { RouterModule, Routes } from '@angular/router';

import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    // {
                    //     path: '',
                    //     loadChildren: 'app/index/index.module#IndexModule', // Lazy load admin module
                    //     data: { preload: true }
                    // },
                    {
                        path: 'auth',
                        loadChildren: 'app/auth/auth.module#AuthModule', // Lazy load account module
                        data: { preload: true }
                    },
                    {
                        path: 'booking',
                        loadChildren: 'app/booking/booking.module#BookingModule', // Lazy load account module
                        data: { preload: true }
                    },
                    {
                        path: 'user',
                        loadChildren: 'app/user/user.module#UserModule', // Lazy load admin module
                        data: { preload: true }
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

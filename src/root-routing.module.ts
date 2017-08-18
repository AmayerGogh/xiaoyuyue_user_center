import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: 'auth/auth.module#AuthModule',
        data: { preload: true }
    },
    {
    path: 'booking',
    loadChildren: 'booking/booking.module#BookingModule',
    data: { preload: true }
    },
    {
    path: 'wp',
    loadChildren: 'mobile/mobile.module#MobileModule',
    data: { preload: true }
    },
    {
    path: 'pc',
    loadChildren: 'desktop/desktop.module#DesktopModule',
    data: { preload: true }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }
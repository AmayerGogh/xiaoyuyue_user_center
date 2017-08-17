import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
    // {
    //     path: 'auth',
    //     loadChildren: 'app/auth/auth.module#AuthModule', // Lazy load account module
    //     data: { preload: true }
    // },
    // {
    //     path: 'booking',
    //     loadChildren: 'app/booking/booking.module#BookingModule', // Lazy load account module
    //     data: { preload: true }
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule {

}

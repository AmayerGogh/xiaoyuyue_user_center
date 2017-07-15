import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    // { path: '', redirectTo: '/manage/center', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: 'auth/auth.module#AuthModule', //Lazy load account module
        data: { preload: true }
    },
    {
    path: 'booking',
    loadChildren: 'booking/booking.module#BookingModule', //Lazy load account module
    data: { preload: true }
    }    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingComponent } from "booking/booking.component";
import { BookingTimeComponent } from "booking/time/booking-time.component";
import { BookingAboutComponent } from "booking/about/booking-about.component";
import { BookingRatingComponent } from "booking/rating/booking-rating.component";
import { AppRouteGuard } from "app/shared/common/auth/auth-route-guard";
import { BookedComponent } from './booked/booked.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                canActivate: [AppRouteGuard],
                canActivateChild: [AppRouteGuard],
                component: BookingComponent,
                children: [
                    { path: '', redirectTo: 'about' },
                    { path: 'about/:id', component: BookingAboutComponent},
                    { path: 'time/:id', component: BookingTimeComponent},
                    { path: 'rating/:id', component: BookingRatingComponent}
                ]
            },
            {
                path: 'booked/:id', component: BookedComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class BookingRoutingModule { }
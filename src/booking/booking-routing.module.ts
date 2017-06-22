import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingComponent } from "booking/booking.component";
import { BookingTimeComponent } from "booking/time/booking-time.component";
import { BookingAboutComponent } from "booking/about/booking-about.component";
import { BookingRatingComponent } from "booking/rating/booking-rating.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: BookingComponent,
                children: [
                    { path: '', redirectTo: 'about' },
                    { path: 'about', component: BookingAboutComponent},
                    { path: 'time', component: BookingTimeComponent},
                    { path: 'rating', component: BookingRatingComponent}
                ]
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
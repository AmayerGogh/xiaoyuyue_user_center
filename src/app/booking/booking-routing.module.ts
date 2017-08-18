import { BookedComponent } from './booked/booked.component';
import { BookingAboutComponent } from './about/booking-about.component';
import { BookingCommentsComponent } from './comments/booking-comments.component';
import { BookingComponent } from './booking.component';
import { BookingTimeComponent } from './time/booking-time.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'booking',
                component: BookingComponent,
                children: [
                    { path: '', redirectTo: 'about' },
                    { path: 'about/:id', component: BookingAboutComponent },
                    { path: 'time/:id', component: BookingTimeComponent },
                    { path: 'rating/:id', component: BookingCommentsComponent }
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
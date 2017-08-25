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
                path: ':id',
                component: BookingComponent,
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
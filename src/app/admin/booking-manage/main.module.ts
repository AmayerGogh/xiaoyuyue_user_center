import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingManageComponent } from "app/admin/booking-manage/booking-manage.component";
import { MainRoutingModule } from "app/admin/booking-manage/main-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MainRoutingModule,
    ],
    declarations: [
        BookingManageComponent
    ]
})
export class MainModule { }
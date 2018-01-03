import { CommonModule } from '@angular/common';
import { DesktopComponent } from './desktop.component';
import { DesktopRoutingModule } from './desktop.routing';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'app/shared/common/app-common.module';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        DesktopRoutingModule
    ],
    declarations: [
        DesktopComponent,
        HomeComponent,
    ]
})
export class DesktopModule { }
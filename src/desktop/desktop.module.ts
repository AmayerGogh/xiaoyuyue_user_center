import { CommonModule } from '@angular/common';
import { DesktopComponent } from './desktop.component';
import { DesktopRoutingModule } from 'desktop/desktop.routing';
import { FooterComponent } from "desktop/layout/footer/footer.component";
import { HeaderComponent } from 'desktop/layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        DesktopRoutingModule
    ],
    declarations: [
        DesktopComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent
    ]
})
export class DesktopModule { }
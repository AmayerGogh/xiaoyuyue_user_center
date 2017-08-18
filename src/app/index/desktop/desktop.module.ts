import { CommonModule } from '@angular/common';
import { DesktopComponent } from './desktop.component';
import { DesktopRoutingModule } from './desktop.routing';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
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
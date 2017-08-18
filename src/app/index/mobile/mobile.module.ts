import * as ngCommon from '@angular/common';

import { APP_INITIALIZER, NgModule } from '@angular/core';

import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { MobileComponent } from './mobile.component';
import { MobileRoutingModule } from './mobile-routing.module';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        MobileRoutingModule
    ],
    declarations: [
        MobileComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        IntroductionComponent
    ],
    providers: [
    ]
})
export class MobileModule {

}
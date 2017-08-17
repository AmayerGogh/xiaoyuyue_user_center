import * as ngCommon from '@angular/common';

import { APP_INITIALIZER, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from "mobile/main.component";
import { IndexFooterComponent } from './layout/footer/footer.component';
import { IndexHeaderComponent } from './layout/header/header.component';
import { IndexRoutingModule } from "mobile/main-routing.module";
import { IntroductionComponent } from './introduction/introduction.component';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        IndexRoutingModule
    ],
    declarations: [
        IndexComponent,
        IndexHeaderComponent,
        IndexFooterComponent,
        HomeComponent,
        IntroductionComponent
    ],
    providers: [
    ]
})
export class IndexModule {

}
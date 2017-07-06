import * as ngCommon from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IntroductionComponent } from './introduction/introduction.component';
import { HomeComponent } from './home/home.component';
import { IndexRoutingModule } from "index/main-routing.module";
import { IndexComponent } from "index/main.component";
import { IndexHeaderComponent } from './layout/header/header.component';
import { IndexFooterComponent } from './layout/footer/footer.component';

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
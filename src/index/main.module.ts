import * as ngCommon from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IntroductionComponent } from './introduction/introduction.component';
import { HomeComponent } from './home/home.component';
import { IndexRoutingModule } from "index/main-routing.module";

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        IndexRoutingModule
    ],
    declarations: [
        HomeComponent,
        IntroductionComponent
    ],
    providers: [
    ]
})
export class IndexModule {

}
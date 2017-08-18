import { ModalModule, TooltipModule } from "ngx-bootstrap";

import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    IndexRoutingModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  declarations: [IndexComponent]
})
export class IndexModule { }
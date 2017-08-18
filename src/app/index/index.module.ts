import { CommonModule } from '@angular/common';
import { DeviceSwtichGuard } from 'app/shared/common/auth/device-switch.service';
import { IndexRoutingModule } from './index-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    IndexRoutingModule,
  ],
  declarations: [

  ],
  providers: [
    DeviceSwtichGuard
  ]
})
export class IndexModule {

}

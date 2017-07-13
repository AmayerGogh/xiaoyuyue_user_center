import { NgModule } from '@angular/core';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.SessionServiceProxy,

        ApiServiceProxies.OrgBookingServiceProxy,
        ApiServiceProxies.PerBookingOrderServiceProxy,
        ApiServiceProxies.OutletServiceServiceProxy,
        ApiServiceProxies.PictureServiceProxy,
        ApiServiceProxies.SMSTemplateServiceProxy,

        ApiServiceProxies.ProfileServiceProxy,
        ApiServiceProxies.SMSServiceProxy,
        ApiServiceProxies.BookingServiceProxy,
        ApiServiceProxies.SMSTemplateServiceProxy,
    ]
})
export class ServiceProxyModule { }

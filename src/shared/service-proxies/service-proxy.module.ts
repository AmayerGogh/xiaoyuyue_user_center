import { NgModule } from '@angular/core';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,

        ApiServiceProxies.OrgBookingServiceProxy,
        ApiServiceProxies.PerBookingOrderServiceProxy,
        ApiServiceProxies.OutletServiceServiceProxy,
        ApiServiceProxies.PictureServiceProxy,
        ApiServiceProxies.SMSTemplateServiceProxy,

        ApiServiceProxies.ProfileServiceProxy,
        ApiServiceProxies.SMSServiceProxy,
        ApiServiceProxies.BookingServiceProxy,
        ApiServiceProxies.SMSTemplateServiceProxy,
        ApiServiceProxies.PerBookingOrderServiceProxy,
        
    ]
})
export class ServiceProxyModule { }

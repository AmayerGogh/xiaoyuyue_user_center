import { Component, OnInit, ViewChild, ElementRef, Input, Injector } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { JoinBookingInfoDto } from 'shared/service-proxies/service-proxies';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
    selector: 'xiaoyuyue-business-maps-model',
    templateUrl: './business-maps-model.component.html',
    styleUrls: ['./business-maps-model.component.scss']
})
export class BusinessMapsModelComponent extends AppComponentBase implements OnInit {
    addressUrl: SafeResourceUrl;
    source: string = 'https://uri.amap.com/marker';
    lng: string;
    lat: string;
    name: string;
    src: string = 'xiaoyuyue_webapp';
    coordinate: string = 'gaode';
    callnative: string = '1';

    @ViewChild('businessMapsModel') businessMapsModel: ModalDirective;
    @Input()
    businessAboutData: JoinBookingInfoDto;
    constructor(
        private injector: Injector,
        private _sanitizer: DomSanitizer,

    ) {
        super(injector);
    }

    ngOnInit() {
    }

    show(): void {
        this.businessMapsModel.show();
        this.mapsAddress();
    }
    hide(): void {
        this.businessMapsModel.hide();
    }

    mapsAddress(): void {
        this.lat = this.businessAboutData.outletLongitude.split(',')[0];
        this.lng = this.businessAboutData.outletLongitude.split(',')[1];
        this.name = this.businessAboutData.outletAddress + this.businessAboutData.outletName;

        this.addressUrl = this._sanitizer.bypassSecurityTrustResourceUrl(`${this.source}?position=${this.lng},${this.lat}&name=${this.name}&src=${this.src}&coordinate=${this.coordinate}&callnative=${this.callnative}`)
    }
}

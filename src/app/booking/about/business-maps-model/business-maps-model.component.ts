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
    source: string = 'http://apis.map.qq.com/uri/v1/marker';
    coord: string;
    title: string;
    addr: string;
    referer: string = 'xiaoyuyue_webapp';

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
        this.coord = this.businessAboutData.outletLongitude;
        this.title = this.businessAboutData.outletName;
        this.addr = this.businessAboutData.outletAddress;

        this.addressUrl = this._sanitizer.bypassSecurityTrustResourceUrl(`${this.source}?marker=coord:${this.coord};title:${this.title};addr:${this.addr}&referer=${this.referer}`)
    }
}

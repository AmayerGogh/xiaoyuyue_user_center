import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { SitemapsService } from 'shared/services/sitemaps.service';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-custom-service',
    templateUrl: './custom-service.component.html',
    styleUrls: ['./custom-service.component.scss'],
    animations: [accountModuleAnimation()],
    encapsulation: ViewEncapsulation.None
})
export class CustomServiceComponent extends AppComponentBase implements OnInit {
    resultData: any;

    constructor(
        injector: Injector,
        private _sitemapsService: SitemapsService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.loadData();
    }

    private loadData(): void {
        this._sitemapsService.getResultData('contacthelp', (result) => {
            this.resultData = result;
        })
    }
}

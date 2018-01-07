import { Component, Injector, OnInit } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { SitemapsService } from 'shared/services/sitemaps.service';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-notice',
    templateUrl: './notice.component.html',
    styleUrls: ['./notice.component.scss'],
    animations: [accountModuleAnimation()]
})
export class NoticeComponent extends AppComponentBase implements OnInit {
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
        this._sitemapsService.getResultData('protocol', (result) => {
            this.resultData = result;
        })
    }
}

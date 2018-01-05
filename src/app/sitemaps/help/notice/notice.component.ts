import { Component, OnInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';
import { SitemapsService } from 'shared/services/sitemaps.service';

@Component({
    selector: 'xiaoyuyue-notice',
    templateUrl: './notice.component.html',
    styleUrls: ['./notice.component.scss'],
    animations: [accountModuleAnimation()]
})
export class NoticeComponent implements OnInit {
    resultData: any;

    constructor(
        private _sitemapsService: SitemapsService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    private loadData(): void {
        this._sitemapsService.getResultData('protocol', (result) => {
            this.resultData = result;
        })
    }
}

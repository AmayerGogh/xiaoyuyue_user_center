import { Component, OnInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';
import { SitemapsService } from 'shared/services/sitemaps.service';

@Component({
    selector: 'xiaoyuyue-case',
    templateUrl: './case.component.html',
    styleUrls: ['./case.component.scss'],
    animations: [accountModuleAnimation()]
})
export class CaseComponent implements OnInit {
    resultData: any;
    constructor(
        private _sitemapsService: SitemapsService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        this._sitemapsService.getResultData('case', (result) => {
            this.resultData = result;
        })
    }
}

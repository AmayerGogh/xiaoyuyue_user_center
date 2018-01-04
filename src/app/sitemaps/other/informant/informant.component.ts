import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';
import { SitemapsService } from 'shared/services/sitemaps.service';

@Component({
    selector: 'xiaoyuyue-informant',
    templateUrl: './informant.component.html',
    styleUrls: ['./informant.component.scss'],
    animations: [accountModuleAnimation()],
    encapsulation: ViewEncapsulation.None
})
export class InformantComponent implements OnInit {
    resultData: any;

    constructor(
        private _sitemapsService: SitemapsService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        this._sitemapsService.getResultData('informant', (result) => {
            this.resultData = result;
        })
    }
}

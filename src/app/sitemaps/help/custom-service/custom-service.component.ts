import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';
import { SitemapsService } from 'shared/services/sitemaps.service';

@Component({
    selector: 'xiaoyuyue-custom-service',
    templateUrl: './custom-service.component.html',
    styleUrls: ['./custom-service.component.scss'],
    animations: [accountModuleAnimation()],
    encapsulation: ViewEncapsulation.None
})
export class CustomServiceComponent implements OnInit {
    resultData: any;

    constructor(
        private _sitemapsService: SitemapsService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    private loadData(): void {
        this._sitemapsService.getResultData('contacthelp', (result) => {
            this.resultData = result;
        })
    }
}

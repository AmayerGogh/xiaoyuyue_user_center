import { AfterViewInit, Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { SitemapsService } from 'shared/services/sitemaps.service';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-problem',
    templateUrl: './problem.component.html',
    styleUrls: ['./problem.component.scss'],
    animations: [accountModuleAnimation()],
    encapsulation: ViewEncapsulation.None
})
export class ProblemComponent extends AppComponentBase implements OnInit, AfterViewInit {
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

    ngAfterViewInit() {
        $('.collapse').collapse()
    }

    private loadData(): void {
        this._sitemapsService.getResultData('questions', (result) => {
            this.resultData = result;
        })
    }
}

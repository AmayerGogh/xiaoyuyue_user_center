import { Component, OnInit, AfterViewInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';
import { SitemapsService } from 'shared/services/sitemaps.service';

@Component({
    selector: 'xiaoyuyue-problem',
    templateUrl: './problem.component.html',
    styleUrls: ['./problem.component.scss'],
    animations: [accountModuleAnimation()]
})
export class ProblemComponent implements OnInit, AfterViewInit {
    resultData: any;

    constructor(
        private _sitemapsService: SitemapsService
    ) { }

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

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-problem',
    templateUrl: './problem.component.html',
    styleUrls: ['./problem.component.scss'],
    animations: [accountModuleAnimation()]
})
export class ProblemComponent implements OnInit, AfterViewInit {
    resultData: any;

    constructor() { }

    ngOnInit() {
        this.loadData();
    }

    ngAfterViewInit() {
        $('.collapse').collapse()
    }

    private loadData(): void {
        let cookieLangValue = abp.utils.getCookieValue('Abp.Localization.CultureName');
        if (!cookieLangValue) {
            cookieLangValue = 'zh-CN';
        }
        const url = `/assets/questions.${cookieLangValue}.json`;
        $.ajax({
            url: url,
            dataType: 'text',
            type: 'GET',
            success: result => {
                result = JSON.parse(result);
                this.resultData = result.questions;
            }
        })
    }
}

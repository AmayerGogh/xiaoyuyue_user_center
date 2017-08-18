import { AfterViewInit, Component, OnInit, ViewContainerRef } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';

@Component({
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

    public constructor(
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }
}


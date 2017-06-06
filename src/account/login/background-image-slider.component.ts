import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AbpSessionService } from '@abp/session/abp-session.service';

@Component({
    selector: "background-image-slider",
    templateUrl: './background-image-slider.component.html',
    animations: [accountModuleAnimation()]
})

export class BackgroundImageSliderComponent extends AppComponentBase {

    @ViewChild('loginBg') _loginBg: ElementRef;
    private $loginBg: JQuery;

    private imageData: string[] = [
        "/assets/common/images/login/bg1.jpg",
        "/assets/common/images/login/bg2.jpg",
        "/assets/common/images/login/bg3.jpg",
    ]
    private imgUrl: string;

    constructor(
        injector: Injector,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        // this.imgUrl = `url(${this.imageData[0]}`;
        this.$loginBg = $(this._loginBg.nativeElement);
        $(this.$loginBg).backstretch(this.imageData, { duration: 5000, fade: 500 });
    }
}

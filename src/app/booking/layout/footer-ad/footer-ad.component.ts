import { Component, OnInit } from '@angular/core';

declare var Swiper: any;
@Component({
    selector: 'xiaoyuyue-footer-ad',
    templateUrl: './footer-ad.component.html',
    styleUrls: ['./footer-ad.component.scss']
})
export class FooterAdComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.initSwiper();
        }, 500);
    }

    initSwiper(): void {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
        console.log(swiper);
    }
}

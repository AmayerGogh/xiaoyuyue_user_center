import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

    constructor(
    ) { }

    ngOnInit() {
        if (window.location.href.indexOf('intro') > 0) {
            $('.top-fixed').css({
                backgroundColor: "#FF9641"
            });
            $('.top-fixed .content').css({
                top: 0,
                marginTop: 0,
                transform: "scale(1.04)"
            });
            $(window).on('scroll', () => {
                if ($(window).scrollTop() <= 0) {
                    $('.top-fixed').css({
                        backgroundColor: "#FF9641"
                    });
                    $('.top-fixed .content').css({
                        top: 0,
                        marginTop: 0,
                        transform: "scale(1.04)"
                    });
                }
            })
        }
    }
}

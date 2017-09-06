import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'xiaoyuyue-index-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    selectIndex: number;
    isShowSubMenuFlag = false;
    href: string = location.href;
    isDefaultSelect: boolean = this.href.substr(this.href.lastIndexOf('/') + 1, this.href.length).length > 0;
    menuArr: string[] = ['公众号', '应用场景', '关于我们'];
    menuAnchorsArr: string[] = ['/mobile#sence', '/mobile#scanSode', '/mobile#about'];
    @Output() isSubMenu: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
        if (!this.isDefaultSelect) {
            this.selectIndex = 0;
        }
    }
    ngAfterViewInit() {
        $(window).on('scroll', () => {
            if (this.selectIndex >= 1) {
                return;
            }
            if ($(window).scrollTop() <= 0) {
                $('.top-fixed').css({
                    backgroundColor: 'rgba(0,0,0,0)'
                });
                $('.top-fixed .content').css({
                    top: '-10px',
                    marginTop: '10px',
                    transform: 'scale(1)'
                });
                return;
            }
            $('.top-fixed').css({
                backgroundColor: '#FF9641'
            });
            $('.top-fixed .content').css({
                top: 0,
                marginTop: 0,
                transform: 'scale(1.04)'
            });
        })
    }


    isShowSubMenu(index?: number) {
        this.isShowSubMenuFlag = !this.isShowSubMenuFlag;
        this.selectIndex = index;
        if (this.selectIndex === 1) {
            $('.top-fixed').css({
                'backgroundColor': 'rgb(255, 150, 65)'
            });
        }
        this.isSubMenu.emit(this.isShowSubMenuFlag);

        if (index === 1) {
            this._router.navigate(['/mobile/intro']);
        }
    }


}

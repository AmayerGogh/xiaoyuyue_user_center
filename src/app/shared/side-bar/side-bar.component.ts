import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'xiaoyuyue-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @ViewChild('sideBar') sideBarEle: ElementRef;
  constructor() { }

  ngOnInit() {
    this.hideSideBar();
  }

  showSideBar() {
    this.sideBarEle.nativeElement.style.display = 'block';
    $('html').css({
      transform: 'translateX(-250px)',
      transition: 'all 0.6s cubic-bezier(0.13, 0.41, 0, 1.17)'
    })
  }

  hideSideBar() {
    this.sideBarEle.nativeElement.style.display = 'none';
    $('html').css({
      transform: 'translateX(0)',
      transition: 'all 0.6s cubic-bezier(0.13, 0.41, 0, 1.17)'
    })
  }


}

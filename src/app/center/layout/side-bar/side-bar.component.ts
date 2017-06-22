import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'xiaoyuyue-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @ViewChild('sideBar') sideBarEle: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  showSideBar() {
    this.sideBarEle.nativeElement.style.display = "block";
  }

  hideSideBar() {
    this.sideBarEle.nativeElement.style.display = "none";
  }

}
